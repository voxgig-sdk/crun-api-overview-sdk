package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CrunApiOverview",
			"slug": "crun-api-overview",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.crun.ai",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"generate": map[string]any{},
				"task": map[string]any{},
			},
		},
		"entity": map[string]any{
			"generate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aspect_ratio",
						"short": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "callback_url",
						"short": "Optional webhook URL to receive task completion notification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"short": "Duration of the video in seconds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "height",
						"short": "Height of the generated image in pixels",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image_url",
						"short": "Optional reference image URL for image-to-video generation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"req": true,
						"short": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "negative_prompt",
						"short": "Text description of what to avoid in the generated image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "num_images",
						"short": "Number of images to generate",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "prompt",
						"req": true,
						"short": "Text description of the image to generate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Initial status of the task",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "task_id",
						"req": true,
						"short": "Unique identifier for the created task.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"short": "Width of the generated image in pixels",
						"type": "`$INTEGER`",
					},
				},
				"name": "generate",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/image/generate",
								"parts": []any{
									"image",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/video/generate",
								"parts": []any{
									"video",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"task": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "completed_at",
						"short": "Timestamp when the task was completed (if applicable)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"req": true,
						"short": "Timestamp when the task was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credit_consumption",
						"short": "Number of credits consumed by this task",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "error",
						"short": "Error details if the task failed",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "input_parameters",
						"short": "The input parameters used to create the task",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "model",
						"req": true,
						"short": "Name of the AI model used for this task",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"short": "Generated media files or output data.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Current status of the task",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "task_id",
						"req": true,
						"short": "Unique identifier of the task",
						"type": "`$STRING`",
					},
				},
				"name": "task",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "task_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tasks/{task_id}",
								"parts": []any{
									"tasks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
