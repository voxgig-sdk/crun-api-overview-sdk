"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TaskEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CRUN_API_OVERVIEW_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CRUN_API_OVERVIEW_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CrunApiOverviewSDK.test();
        const ent = testsdk.Task();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CrunApiOverviewSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Task().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CRUN_API_OVERVIEW_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'task.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "Timestamp when the task was completed (if applicable)", "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "sh": "Timestamp when the task was created", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "credit_consumption": { "a": true, "h": "Credit Consumption", "n": "credit_consumption", "r": false, "sh": "Number of credits consumed by this task", "t": "`$NUMBER`", "key$": "credit_consumption", "index$": 2 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "sh": "Error details if the task failed", "t": "`$OBJECT`", "key$": "error", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "input_parameters": { "a": true, "h": "Input Parameters", "n": "input_parameters", "r": false, "sh": "The input parameters used to create the task", "t": "`$OBJECT`", "key$": "input_parameters", "index$": 5 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "Name of the AI model used for this task", "t": "`$STRING`", "key$": "model", "index$": 6 }, "results": { "a": true, "h": "Results", "n": "results", "r": false, "sh": "Generated media files or output data.", "t": "`$ARRAY`", "key$": "results", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Current status of the task", "t": "`$STRING`", "key$": "status", "index$": 8 }, "task_id": { "a": true, "h": "Task Id", "n": "task_id", "r": true, "sh": "Unique identifier of the task", "t": "`$STRING`", "key$": "task_id", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "task", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /tasks/{task_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "task_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/tasks/{task_id}", "q": { "exist": ["id"] }, "r": { "param": { "task_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "tasks" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "task", "name__orig": "task", "Name": "Task", "name_": "task", "name-": "task", "NAME": "TASK", "index$": 1 }, { "active": true, "entity": "task", "key$": "BasicTaskFlow", "kind": "basic", "name": "BasicTaskFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "task_ref01", "srcdatavar": "task_ref01_data", "suffix": "_dt0" }, "m": { "id": "task01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-task_ref01" } }], "index$": 0 }] }, 'Task', { "GET /tasks/{task_id}": { "protocol": "http", "parameters": [{ "name": "task_id", "in": "path", "required": true, "description": "The unique identifier of the task to retrieve", "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let task_ref01_data = Object.values(setup.data.existing.task)[0];
        // LOAD
        const task_ref01_ent = client.Task();
        const task_ref01_match_dt0 = {};
        task_ref01_match_dt0.id = task_ref01_data.id;
        const task_ref01_data_dt0 = (await task_ref01_ent.load(task_ref01_match_dt0)).data();
        (0, node_assert_1.default)(task_ref01_data_dt0.id === task_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/task/TaskTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CrunApiOverviewSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['task01', 'task02', 'task03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CRUN_API_OVERVIEW_TEST_TASK_ENTID': idmap,
        'CRUN_API_OVERVIEW_TEST_LIVE': 'FALSE',
        'CRUN_API_OVERVIEW_TEST_EXPLAIN': 'FALSE',
        'CRUN_API_OVERVIEW_APIKEY': '',
    });
    idmap = env['CRUN_API_OVERVIEW_TEST_TASK_ENTID'];
    const live = 'TRUE' === env.CRUN_API_OVERVIEW_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CRUN_API_OVERVIEW_TEST_TASK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CrunApiOverviewSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CRUN_API_OVERVIEW_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CRUN_API_OVERVIEW_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TaskEntity.test.js.map