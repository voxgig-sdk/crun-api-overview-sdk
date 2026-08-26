-- CrunApiOverview SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CrunApiOverview",
      slug = "crun-api-overview",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.crun.ai",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["generate"] = {},
        ["task"] = {},
      },
    },
    entity = {
      ["generate"] = {
        ["fields"] = {
          {
            ["name"] = "aspect_ratio",
            ["short"] = "Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "callback_url",
            ["short"] = "Optional webhook URL to receive task completion notification",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration",
            ["short"] = "Duration of the video in seconds",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "height",
            ["short"] = "Height of the generated image in pixels",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "image_url",
            ["short"] = "Optional reference image URL for image-to-video generation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "model",
            ["req"] = true,
            ["short"] = "Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "negative_prompt",
            ["short"] = "Text description of what to avoid in the generated image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "num_images",
            ["short"] = "Number of images to generate",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "prompt",
            ["req"] = true,
            ["short"] = "Text description of the image to generate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["short"] = "Initial status of the task",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "task_id",
            ["req"] = true,
            ["short"] = "Unique identifier for the created task.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "width",
            ["short"] = "Width of the generated image in pixels",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "generate",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/image/generate",
                ["parts"] = {
                  "image",
                  "generate",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/video/generate",
                ["parts"] = {
                  "video",
                  "generate",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["task"] = {
        ["fields"] = {
          {
            ["name"] = "completed_at",
            ["short"] = "Timestamp when the task was completed (if applicable)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["req"] = true,
            ["short"] = "Timestamp when the task was created",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "credit_consumption",
            ["short"] = "Number of credits consumed by this task",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "error",
            ["short"] = "Error details if the task failed",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "input_parameters",
            ["short"] = "The input parameters used to create the task",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "model",
            ["req"] = true,
            ["short"] = "Name of the AI model used for this task",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "results",
            ["short"] = "Generated media files or output data.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["short"] = "Current status of the task",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "task_id",
            ["req"] = true,
            ["short"] = "Unique identifier of the task",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "task",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "task_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tasks/{task_id}",
                ["parts"] = {
                  "tasks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["task_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
