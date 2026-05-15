package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/opensky-network-sdk"
	"github.com/voxgig-sdk/opensky-network-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestStateVectorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.StateVector(nil)
		if ent == nil {
			t.Fatal("expected non-nil StateVectorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := state_vectorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "state_vector." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENSKYNETWORK_TEST_STATE_VECTOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		stateVectorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.state_vector", setup.data)))
		var stateVectorRef01Data map[string]any
		if len(stateVectorRef01DataRaw) > 0 {
			stateVectorRef01Data = core.ToMapAny(stateVectorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = stateVectorRef01Data

		// LIST
		stateVectorRef01Ent := client.StateVector(nil)
		stateVectorRef01Match := map[string]any{}

		stateVectorRef01ListResult, err := stateVectorRef01Ent.List(stateVectorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, stateVectorRef01ListOk := stateVectorRef01ListResult.([]any)
		if !stateVectorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", stateVectorRef01ListResult)
		}

	})
}

func state_vectorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "state_vector", "StateVectorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read state_vector test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse state_vector test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"state_vector01", "state_vector02", "state_vector03"},
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
	entidEnvRaw := os.Getenv("OPENSKYNETWORK_TEST_STATE_VECTOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENSKYNETWORK_TEST_STATE_VECTOR_ENTID": idmap,
		"OPENSKYNETWORK_TEST_LIVE":      "FALSE",
		"OPENSKYNETWORK_TEST_EXPLAIN":   "FALSE",
		"OPENSKYNETWORK_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENSKYNETWORK_TEST_STATE_VECTOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENSKYNETWORK_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENSKYNETWORK_APIKEY"],
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
