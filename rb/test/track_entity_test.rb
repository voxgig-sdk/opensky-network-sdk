# Track entity test

require "minitest/autorun"
require "json"
require_relative "../OpenskyNetwork_sdk"
require_relative "runner"

class TrackEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenskyNetworkSDK.test(nil, nil)
    ent = testsdk.Track(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = track_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "track." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENSKYNETWORK_TEST_TRACK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    track_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.track")))
    track_ref01_data = nil
    if track_ref01_data_raw.length > 0
      track_ref01_data = Helpers.to_map(track_ref01_data_raw[0][1])
    end

    # LIST
    track_ref01_ent = client.Track(nil)
    track_ref01_match = {}

    track_ref01_list_result, err = track_ref01_ent.list(track_ref01_match, nil)
    assert_nil err
    assert track_ref01_list_result.is_a?(Array)

  end
end

def track_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "track", "TrackTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenskyNetworkSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["track01", "track02", "track03"],
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
  entid_env_raw = ENV["OPENSKYNETWORK_TEST_TRACK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENSKYNETWORK_TEST_TRACK_ENTID" => idmap,
    "OPENSKYNETWORK_TEST_LIVE" => "FALSE",
    "OPENSKYNETWORK_TEST_EXPLAIN" => "FALSE",
    "OPENSKYNETWORK_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENSKYNETWORK_TEST_TRACK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENSKYNETWORK_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OPENSKYNETWORK_APIKEY"],
      },
      extra || {},
    ])
    client = OpenskyNetworkSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENSKYNETWORK_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENSKYNETWORK_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
