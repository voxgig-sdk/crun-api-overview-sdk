"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CrunApiOverview',
        slug: "crun-api-overview",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.crun.ai",
        auth: {
            prefix: '',
            name: 'X-API-KEY',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            generate: {},
            task: {},
        }
    };
    entity = {
        "generate": {
            "fields": [
                {
                    "name": "aspect_ratio",
                    "short": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "callback_url",
                    "short": "Optional webhook URL to receive task completion notification",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "short": "Duration of the video in seconds",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "height",
                    "short": "Height of the generated image in pixels",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "uri",
                    "name": "image_url",
                    "short": "Optional reference image URL for image-to-video generation",
                    "type": "`$STRING`"
                },
                {
                    "name": "model",
                    "req": true,
                    "short": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)",
                    "type": "`$STRING`"
                },
                {
                    "name": "negative_prompt",
                    "short": "Text description of what to avoid in the generated image",
                    "type": "`$STRING`"
                },
                {
                    "name": "num_images",
                    "short": "Number of images to generate",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "prompt",
                    "req": true,
                    "short": "Text description of the image to generate",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "req": true,
                    "short": "Initial status of the task",
                    "type": "`$STRING`"
                },
                {
                    "name": "task_id",
                    "req": true,
                    "short": "Unique identifier for the created task.",
                    "type": "`$STRING`"
                },
                {
                    "name": "width",
                    "short": "Width of the generated image in pixels",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "generate",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/image/generate",
                            "segments": [
                                {
                                    "lit": "image"
                                },
                                {
                                    "lit": "generate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "image",
                                "generate"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/video/generate",
                            "segments": [
                                {
                                    "lit": "video"
                                },
                                {
                                    "lit": "generate"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "video",
                                "generate"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "task": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "completed_at",
                    "short": "Timestamp when the task was completed (if applicable)",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "created_at",
                    "req": true,
                    "short": "Timestamp when the task was created",
                    "type": "`$STRING`"
                },
                {
                    "name": "credit_consumption",
                    "short": "Number of credits consumed by this task",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "error",
                    "short": "Error details if the task failed",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "input_parameters",
                    "short": "The input parameters used to create the task",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "model",
                    "req": true,
                    "short": "Name of the AI model used for this task",
                    "type": "`$STRING`"
                },
                {
                    "name": "results",
                    "short": "Generated media files or output data.",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "status",
                    "req": true,
                    "short": "Current status of the task",
                    "type": "`$STRING`"
                },
                {
                    "name": "task_id",
                    "req": true,
                    "short": "Unique identifier of the task",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "task",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "task_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tasks/{task_id}",
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "tasks",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map