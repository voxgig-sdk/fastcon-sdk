# Ping entity test

require "minitest/autorun"
require "json"
require_relative "../Fastcon_sdk"
require_relative "runner"

class PingEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FastconSDK.test(nil, nil)
    ent = testsdk.Ping(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ping_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ping." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FASTCON_TEST_PING_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    ping_ref01_ent = client.Ping(nil)
    ping_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.ping"), "ping_ref01"))

    ping_ref01_data_result = ping_ref01_ent.create(ping_ref01_data, nil)
    ping_ref01_data = Helpers.to_map(ping_ref01_data_result)
    assert !ping_ref01_data.nil?

  end
end

def ping_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ping", "PingTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FastconSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ping01", "ping02", "ping03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FASTCON_TEST_PING_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FASTCON_TEST_PING_ENTID" => idmap,
    "FASTCON_TEST_LIVE" => "FALSE",
    "FASTCON_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FASTCON_TEST_PING_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FASTCON_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = FastconSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FASTCON_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FASTCON_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
