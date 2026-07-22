<?php
declare(strict_types=1);

// Ping entity test

require_once __DIR__ . '/../fastcon_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = FastconSDK::test(null, null);
        $ent = $testsdk->Ping(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ping_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ping." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FASTCON_TEST_PING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $ping_ref01_ent = $client->Ping(null);
        $ping_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.ping"), "ping_ref01"));

        $ping_ref01_data_result = $ping_ref01_ent->create($ping_ref01_data, null);
        $ping_ref01_data = Helpers::to_map($ping_ref01_data_result);
        $this->assertNotNull($ping_ref01_data);

    }
}

function ping_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ping/PingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = FastconSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ping01", "ping02", "ping03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("FASTCON_TEST_PING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FASTCON_TEST_PING_ENTID" => $idmap,
        "FASTCON_TEST_LIVE" => "FALSE",
        "FASTCON_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FASTCON_TEST_PING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FASTCON_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new FastconSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FASTCON_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FASTCON_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
