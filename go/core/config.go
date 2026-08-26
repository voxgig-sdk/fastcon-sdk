package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Fastcon",
			"slug": "fastcon",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://fastcon.harknmav.fun",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"ping": map[string]any{},
				"proxy": map[string]any{},
			},
		},
		"entity": map[string]any{
			"ping": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "server_id",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The ID of the pinged server",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Status of the ping operation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "time",
						"req": true,
						"short": "Ping time in milliseconds",
						"type": "`$NUMBER`",
					},
				},
				"name": "ping",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/ping",
								"parts": []any{
									"api",
									"ping",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"proxy": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the proxy server",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "port",
						"req": true,
						"short": "Proxy server port number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "secret",
						"req": true,
						"short": "Secret key for proxy authentication",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "server",
						"req": true,
						"short": "Proxy server hostname or IP address",
						"type": "`$STRING`",
					},
				},
				"name": "proxy",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/proxies",
								"parts": []any{
									"api",
									"proxies",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
