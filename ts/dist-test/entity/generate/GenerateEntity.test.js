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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aspect_ratio": { "a": true, "h": "Aspect Ratio", "n": "aspect_ratio", "r": false, "sh": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)", "t": "`$STRING`", "key$": "aspect_ratio", "index$": 0 }, "callback_url": { "a": true, "fo": "uri", "h": "Callback Url", "n": "callback_url", "r": false, "sh": "Optional webhook URL to receive task completion notification", "t": "`$STRING`", "key$": "callback_url", "index$": 1 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "sh": "Duration of the video in seconds", "t": "`$NUMBER`", "key$": "duration", "index$": 2 }, "height": { "a": true, "h": "Height", "n": "height", "r": false, "sh": "Height of the generated image in pixels", "t": "`$INTEGER`", "key$": "height", "index$": 3 }, "image_url": { "a": true, "fo": "uri", "h": "Image Url", "n": "image_url", "r": false, "sh": "Optional reference image URL for image-to-video generation", "t": "`$STRING`", "key$": "image_url", "index$": 4 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)", "t": "`$STRING`", "key$": "model", "index$": 5 }, "negative_prompt": { "a": true, "h": "Negative Prompt", "n": "negative_prompt", "r": false, "sh": "Text description of what to avoid in the generated image", "t": "`$STRING`", "key$": "negative_prompt", "index$": 6 }, "num_images": { "a": true, "h": "Num Images", "n": "num_images", "r": false, "sh": "Number of images to generate", "t": "`$INTEGER`", "key$": "num_images", "index$": 7 }, "prompt": { "a": true, "h": "Prompt", "n": "prompt", "r": true, "sh": "Text description of the image to generate", "t": "`$STRING`", "key$": "prompt", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Initial status of the task", "t": "`$STRING`", "key$": "status", "index$": 9 }, "task_id": { "a": true, "h": "Task Id", "n": "task_id", "r": true, "sh": "Unique identifier for the created task.", "t": "`$STRING`", "key$": "task_id", "index$": 10 }, "width": { "a": true, "h": "Width", "n": "width", "r": false, "sh": "Width of the generated image in pixels", "t": "`$INTEGER`", "key$": "width", "index$": 11 } }, "name": "generate", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /image/generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/image/generate", "q": {}, "r": {}, "s": [{ "lit": "image" }, { "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /video/generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/video/generate", "q": {}, "r": {}, "s": [{ "lit": "video" }, { "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "generate", "name__orig": "generate", "Name": "Generate", "name_": "generate", "name-": "generate", "NAME": "GENERATE", "index$": 0 }, { "active": true, "entity": "generate", "key$": "BasicGenerateFlow", "kind": "basic", "name": "BasicGenerateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "generate_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Generate', { "POST /image/generate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "model": { "type": "string", "description": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)", "example": "flux", "key$": "model" }, "prompt": { "type": "string", "description": "Text description of the image to generate", "key$": "prompt" }, "negative_prompt": { "type": "string", "description": "Text description of what to avoid in the generated image", "nullable": true, "key$": "negative_prompt" }, "width": { "type": "integer", "description": "Width of the generated image in pixels", "nullable": true, "key$": "width" }, "height": { "type": "integer", "description": "Height of the generated image in pixels", "nullable": true, "key$": "height" }, "num_images": { "type": "integer", "description": "Number of images to generate", "default": 1, "minimum": 1, "nullable": true, "key$": "num_images" }, "callback_url": { "type": "string", "format": "uri", "description": "Optional webhook URL to receive task completion notification", "nullable": true, "key$": "callback_url" } }, "required": ["model", "prompt"], "x-ref": "#/components/schemas/ImageGenerationRequest", "index$": 1 } } } }, "parameters": [] }, "POST /video/generate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "model": { "type": "string", "description": "Name of the video generation model to use (e.g., google, grok, imagine, kling, bytedance, sora2, wan, vidu, hailuo, runway)", "example": "kling", "key$": "model" }, "prompt": { "type": "string", "description": "Text description of the video to generate", "key$": "prompt" }, "duration": { "type": "number", "description": "Duration of the video in seconds", "nullable": true, "key$": "duration" }, "image_url": { "type": "string", "format": "uri", "description": "Optional reference image URL for image-to-video generation", "nullable": true, "key$": "image_url" }, "aspect_ratio": { "type": "string", "description": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)", "nullable": true, "key$": "aspect_ratio" }, "callback_url": { "type": "string", "format": "uri", "description": "Optional webhook URL to receive task completion notification", "nullable": true, "key$": "callback_url" } }, "required": ["model", "prompt"], "x-ref": "#/components/schemas/VideoGenerationRequest", "index$": 1 } } } }, "parameters": [] } });
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