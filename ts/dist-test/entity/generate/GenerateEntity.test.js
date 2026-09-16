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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GenerateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CRUN_API_OVERVIEW_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CRUN_API_OVERVIEW_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CrunApiOverviewSDK.test();
        const ent = testsdk.Generate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CRUN_API_OVERVIEW_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'generate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "aspect_ratio", "req": false, "short": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uri", "name": "callback_url", "req": false, "short": "Optional webhook URL to receive task completion notification", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "duration", "req": false, "short": "Duration of the video in seconds", "type": "`$NUMBER`", "index$": 2 }, { "active": true, "name": "height", "req": false, "short": "Height of the generated image in pixels", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "format": "uri", "name": "image_url", "req": false, "short": "Optional reference image URL for image-to-video generation", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "model", "req": true, "short": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "negative_prompt", "req": false, "short": "Text description of what to avoid in the generated image", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "num_images", "req": false, "short": "Number of images to generate", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "prompt", "req": true, "short": "Text description of the image to generate", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "status", "req": true, "short": "Initial status of the task", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "task_id", "req": true, "short": "Unique identifier for the created task.", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "width", "req": false, "short": "Width of the generated image in pixels", "type": "`$INTEGER`", "index$": 11 }], "name": "generate", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /image/generate", "json": "{\"operationId\":\"generateImage\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"callback_url\":{\"description\":\"Optional webhook URL to receive task completion notification\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"height\":{\"description\":\"Height of the generated image in pixels\",\"nullable\":true,\"type\":\"integer\"},\"model\":{\"description\":\"Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)\",\"example\":\"flux\",\"type\":\"string\"},\"negative_prompt\":{\"description\":\"Text description of what to avoid in the generated image\",\"nullable\":true,\"type\":\"string\"},\"num_images\":{\"default\":1,\"description\":\"Number of images to generate\",\"minimum\":1,\"nullable\":true,\"type\":\"integer\"},\"prompt\":{\"description\":\"Text description of the image to generate\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the generated image in pixels\",\"nullable\":true,\"type\":\"integer\"}},\"required\":[\"model\",\"prompt\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"description\":\"Initial status of the task\",\"enum\":[\"pending\",\"processing\"],\"type\":\"string\"},\"task_id\":{\"description\":\"Unique identifier for the created task. Use this to poll for task status and results.\",\"type\":\"string\"}},\"required\":[\"task_id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Task created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Authentication failed\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - more than 20 requests per 10 seconds\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/image/generate", "segments": [{ "lit": "image" }, { "lit": "generate" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "POST /video/generate", "json": "{\"operationId\":\"generateVideo\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"aspect_ratio\":{\"description\":\"Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)\",\"nullable\":true,\"type\":\"string\"},\"callback_url\":{\"description\":\"Optional webhook URL to receive task completion notification\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the video in seconds\",\"nullable\":true,\"type\":\"number\"},\"image_url\":{\"description\":\"Optional reference image URL for image-to-video generation\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"model\":{\"description\":\"Name of the video generation model to use (e.g., google, grok, imagine, kling, bytedance, sora2, wan, vidu, hailuo, runway)\",\"example\":\"kling\",\"type\":\"string\"},\"prompt\":{\"description\":\"Text description of the video to generate\",\"type\":\"string\"}},\"required\":[\"model\",\"prompt\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"description\":\"Initial status of the task\",\"enum\":[\"pending\",\"processing\"],\"type\":\"string\"},\"task_id\":{\"description\":\"Unique identifier for the created task. Use this to poll for task status and results.\",\"type\":\"string\"}},\"required\":[\"task_id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Task created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Authentication failed\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/video/generate", "segments": [{ "lit": "video" }, { "lit": "generate" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "generate", "name__orig": "generate", "Name": "Generate", "name_": "generate", "name-": "generate", "NAME": "GENERATE", "index$": 0 }, { "active": true, "entity": "generate", "key$": "BasicGenerateFlow", "kind": "basic", "name": "BasicGenerateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "generate_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Generate');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const generate_ref01_ent = client.Generate();
        let generate_ref01_data = setup.data.new.generate['generate_ref01'];
        generate_ref01_data = (await generate_ref01_ent.create(generate_ref01_data)).data();
        (0, node_assert_1.default)(null != generate_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/generate/GenerateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CrunApiOverviewSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['generate01', 'generate02', 'generate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CRUN_API_OVERVIEW_TEST_GENERATE_ENTID': idmap,
        'CRUN_API_OVERVIEW_TEST_LIVE': 'FALSE',
        'CRUN_API_OVERVIEW_TEST_EXPLAIN': 'FALSE',
        'CRUN_API_OVERVIEW_APIKEY': '',
    });
    idmap = env['CRUN_API_OVERVIEW_TEST_GENERATE_ENTID'];
    const live = 'TRUE' === env.CRUN_API_OVERVIEW_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CRUN_API_OVERVIEW_TEST_GENERATE_ENTID'];
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
//# sourceMappingURL=GenerateEntity.test.js.map