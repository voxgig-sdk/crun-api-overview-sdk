# CrunApiOverview SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CrunApiOverview",
            "slug": "crun-api-overview",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.crun.ai",
            "auth": {
                "prefix": "",
                "name": "X-API-KEY",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "generate": {},
                "task": {},
            },
        },
        "entity": {
      "generate": {
        "fields": [
          {
            "name": "aspect_ratio",
            "title": "Aspect Ratio",
            "type": "`$STRING`",
            "short": "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)",
          },
          {
            "name": "callback_url",
            "title": "Callback Url",
            "type": "`$STRING`",
            "short": "Optional webhook URL to receive task completion notification",
            "format": "uri",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$NUMBER`",
            "short": "Duration of the video in seconds",
          },
          {
            "name": "height",
            "title": "Height",
            "type": "`$INTEGER`",
            "short": "Height of the generated image in pixels",
          },
          {
            "name": "image_url",
            "title": "Image Url",
            "type": "`$STRING`",
            "short": "Optional reference image URL for image-to-video generation",
            "format": "uri",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)",
          },
          {
            "name": "negative_prompt",
            "title": "Negative Prompt",
            "type": "`$STRING`",
            "short": "Text description of what to avoid in the generated image",
          },
          {
            "name": "num_images",
            "title": "Num Images",
            "type": "`$INTEGER`",
            "short": "Number of images to generate",
          },
          {
            "name": "prompt",
            "title": "Prompt",
            "type": "`$STRING`",
            "req": True,
            "short": "Text description of the image to generate",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Initial status of the task",
          },
          {
            "name": "task_id",
            "title": "Task Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the created task.",
          },
          {
            "name": "width",
            "title": "Width",
            "type": "`$INTEGER`",
            "short": "Width of the generated image in pixels",
          },
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
                    "lit": "image",
                  },
                  {
                    "lit": "generate",
                  },
                ],
                "parts": [
                  "image",
                  "generate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/video/generate",
                "segments": [
                  {
                    "lit": "video",
                  },
                  {
                    "lit": "generate",
                  },
                ],
                "parts": [
                  "video",
                  "generate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "task": {
        "fields": [
          {
            "name": "completed_at",
            "title": "Completed At",
            "type": "`$STRING`",
            "short": "Timestamp when the task was completed (if applicable)",
            "format": "date-time",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp when the task was created",
            "format": "date-time",
          },
          {
            "name": "credit_consumption",
            "title": "Credit Consumption",
            "type": "`$NUMBER`",
            "short": "Number of credits consumed by this task",
          },
          {
            "name": "error",
            "title": "Error",
            "type": "`$OBJECT`",
            "short": "Error details if the task failed",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "input_parameters",
            "title": "Input Parameters",
            "type": "`$OBJECT`",
            "short": "The input parameters used to create the task",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the AI model used for this task",
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
            "short": "Generated media files or output data.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Current status of the task",
          },
          {
            "name": "task_id",
            "title": "Task Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier of the task",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "tasks",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "tasks",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "task_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "task_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
