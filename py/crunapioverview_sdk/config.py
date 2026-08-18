# CrunApiOverview SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.crun.ai",
            "auth": {
                "prefix": "",
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
            "type": "`$STRING`",
          },
          {
            "name": "callback_url",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "type": "`$NUMBER`",
          },
          {
            "name": "height",
            "type": "`$INTEGER`",
          },
          {
            "name": "image_url",
            "type": "`$STRING`",
          },
          {
            "name": "model",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "negative_prompt",
            "type": "`$STRING`",
          },
          {
            "name": "num_images",
            "type": "`$INTEGER`",
          },
          {
            "name": "prompt",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "task_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "width",
            "type": "`$INTEGER`",
          },
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
                "parts": [
                  "image",
                  "generate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/video/generate",
                "parts": [
                  "video",
                  "generate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "credit_consumption",
            "type": "`$NUMBER`",
          },
          {
            "name": "error",
            "type": "`$OBJECT`",
          },
          {
            "name": "input_parameters",
            "type": "`$OBJECT`",
          },
          {
            "name": "model",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "results",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "task_id",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tasks/{task_id}",
                "parts": [
                  "tasks",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "task_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
