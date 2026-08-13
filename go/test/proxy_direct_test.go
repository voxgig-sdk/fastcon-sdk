package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/fastcon-sdk/go"
	"github.com/voxgig-sdk/fastcon-sdk/go/core"
)

func TestProxyDirect(t *testing.T) {
	t.Run("direct-list-proxy", func(t *testing.T) {
		setup := proxyDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-proxy", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		client := setup.client


		result, err := client.Direct(map[string]any{
			"path":   "api/proxies",
			"method": "GET",
			"params": map[string]any{},
		})
		if setup.live {
			// Live-mode leniency is a model decision
			// (main.kit.test.live.strict): synthetic IDs 4xx constantly
			// against an arbitrary public API, so the default SKIPS here.
			// A project that owns its test server sets strict and FAILS.
			if err != nil {
				t.Skipf("list call failed (likely synthetic IDs against live API): %v", err)
			}
			if result["ok"] != true {
				t.Skipf("list call not ok (likely synthetic IDs against live API): %v", result)
			}
			status := core.ToInt(result["status"])
			if status < 200 || status >= 300 {
				t.Skipf("expected 2xx status, got %v", result["status"])
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
		}
	})

}

type proxyDirectSetupResult struct {
	client *sdk.FastconSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func proxyDirectSetup(mockres any) *proxyDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"FASTCON_TEST_PROXY_ENTID": map[string]any{},
		"FASTCON_TEST_LIVE":    "FALSE",
	})

	live := env["FASTCON_TEST_LIVE"] == "TRUE"

	if live {
		mergedOpts := map[string]any{
		}
		client := sdk.NewFastconSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["FASTCON_TEST_PROXY_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &proxyDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewFastconSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &proxyDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
