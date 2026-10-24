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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
                "now": "`$FUNCTION`",
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
                    "title": "Aspect Ratio",
                    "type": "`$STRING`",
                    "short": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)"
                },
                {
                    "name": "callback_url",
                    "title": "Callback Url",
                    "type": "`$STRING`",
                    "short": "Optional webhook URL to receive task completion notification",
                    "format": "uri"
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$NUMBER`",
                    "short": "Duration of the video in seconds"
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$INTEGER`",
                    "short": "Height of the generated image in pixels"
                },
                {
                    "name": "image_url",
                    "title": "Image Url",
                    "type": "`$STRING`",
                    "short": "Optional reference image URL for image-to-video generation",
                    "format": "uri"
                },
                {
                    "name": "model",
                    "title": "Model",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)"
                },
                {
                    "name": "negative_prompt",
                    "title": "Negative Prompt",
                    "type": "`$STRING`",
                    "short": "Text description of what to avoid in the generated image"
                },
                {
                    "name": "num_images",
                    "title": "Num Images",
                    "type": "`$INTEGER`",
                    "short": "Number of images to generate"
                },
                {
                    "name": "prompt",
                    "title": "Prompt",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Text description of the image to generate"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Initial status of the task"
                },
                {
                    "name": "task_id",
                    "title": "Task Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier for the created task."
                },
                {
                    "name": "width",
                    "title": "Width",
                    "type": "`$INTEGER`",
                    "short": "Width of the generated image in pixels"
                }
            ],
            "name": "generate",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
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
                            "parts": [
                                "image",
                                "generate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
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
                            "parts": [
                                "video",
                                "generate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "name": "completed_at",
                    "title": "Completed At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the task was completed (if applicable)",
                    "format": "date-time"
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Timestamp when the task was created",
                    "format": "date-time"
                },
                {
                    "name": "credit_consumption",
                    "title": "Credit Consumption",
                    "type": "`$NUMBER`",
                    "short": "Number of credits consumed by this task"
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$OBJECT`",
                    "short": "Error details if the task failed"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "input_parameters",
                    "title": "Input Parameters",
                    "type": "`$OBJECT`",
                    "short": "The input parameters used to create the task"
                },
                {
                    "name": "model",
                    "title": "Model",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the AI model used for this task"
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`",
                    "short": "Generated media files or output data."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Current status of the task"
                },
                {
                    "name": "task_id",
                    "title": "Task Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier of the task"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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