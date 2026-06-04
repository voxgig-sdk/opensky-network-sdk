package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/opensky-network-sdk/go"
	"github.com/voxgig-sdk/opensky-network-sdk/go/core"

	vs "github.com/voxgig-sdk/opensky-network-sdk/go/utility/struct"
)

func TestTrackEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Track(nil)
		if ent == nil {
			t.Fatal("expected non-nil TrackEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := trackBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "track." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENSKYNETWORK_TEST_TRACK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		trackRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.track", setup.data)))
		var trackRef01Data map[string]any
		if len(trackRef01DataRaw) > 0 {
			trackRef01Data = core.ToMapAny(trackRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = trackRef01Data

		// LIST
		trackRef01Ent := client.Track(nil)
		trackRef01Match := map[string]any{}

		trackRef01ListResult, err := trackRef01Ent.List(trackRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, trackRef01ListOk := trackRef01ListResult.([]any)
		if !trackRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", trackRef01ListResult)
		}

	})
}

func trackBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "track", "TrackTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read track test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse track test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"track01", "track02", "track03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENSKYNETWORK_TEST_TRACK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENSKYNETWORK_TEST_TRACK_ENTID": idmap,
		"OPENSKYNETWORK_TEST_LIVE":      "FALSE",
		"OPENSKYNETWORK_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENSKYNETWORK_TEST_TRACK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENSKYNETWORK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewOpenskyNetworkSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENSKYNETWORK_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENSKYNETWORK_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
