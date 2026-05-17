package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/crun-api-overview-sdk/go"
	"github.com/voxgig-sdk/crun-api-overview-sdk/go/core"

	vs "github.com/voxgig-sdk/crun-api-overview-sdk/go/utility/struct"
)

func TestGenerateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Generate(nil)
		if ent == nil {
			t.Fatal("expected non-nil GenerateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := generateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "generate." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CRUNAPIOVERVIEW_TEST_GENERATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		generateRef01Ent := client.Generate(nil)
		generateRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "generate"}, setup.data), "generate_ref01"))

		generateRef01DataResult, err := generateRef01Ent.Create(generateRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		generateRef01Data = core.ToMapAny(generateRef01DataResult)
		if generateRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func generateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "generate", "GenerateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read generate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse generate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"generate01", "generate02", "generate03"},
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
	entidEnvRaw := os.Getenv("CRUNAPIOVERVIEW_TEST_GENERATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CRUNAPIOVERVIEW_TEST_GENERATE_ENTID": idmap,
		"CRUNAPIOVERVIEW_TEST_LIVE":      "FALSE",
		"CRUNAPIOVERVIEW_TEST_EXPLAIN":   "FALSE",
		"CRUNAPIOVERVIEW_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CRUNAPIOVERVIEW_TEST_GENERATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CRUNAPIOVERVIEW_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CRUNAPIOVERVIEW_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCrunApiOverviewSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CRUNAPIOVERVIEW_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CRUNAPIOVERVIEW_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
