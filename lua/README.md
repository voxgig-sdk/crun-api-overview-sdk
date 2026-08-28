# CrunApiOverview Lua SDK



The Lua SDK for the CrunApiOverview API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Generate()` — each with the same small set of operations (`load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/crun-api-overview-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("crun-api-overview_sdk")

local client = sdk.new({
  apikey = os.getenv("CRUN_API_OVERVIEW_APIKEY"),
})
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Generate():create({ model = "example_model", prompt = "example_prompt", status = "example_status", task_id = "example_task_id" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local task, err = client:Task():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Task():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CRUN_API_OVERVIEW_TEST_LIVE=TRUE
CRUN_API_OVERVIEW_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### CrunApiOverviewSDK

```lua
local sdk = require("crun-api-overview_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CrunApiOverviewSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Generate` | `(data) -> GenerateEntity` | Create a Generate entity instance. |
| `Task` | `(data) -> TaskEntity` | Create a Task entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local task, err = client:Task():load({ id = "example_id" })
    if err then error(err) end
    -- task is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Generate

| Field | Description |
| --- | --- |
| `aspect_ratio` | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | Optional webhook URL to receive task completion notification |
| `duration` | Duration of the video in seconds |
| `height` | Height of the generated image in pixels |
| `image_url` | Optional reference image URL for image-to-video generation |
| `model` | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | Text description of what to avoid in the generated image |
| `num_images` | Number of images to generate |
| `prompt` | Text description of the image to generate |
| `status` | Initial status of the task |
| `task_id` | Unique identifier for the created task. |
| `width` | Width of the generated image in pixels |

Operations: Create.

API path: `/image/generate`

#### Task

| Field | Description |
| --- | --- |
| `completed_at` | Timestamp when the task was completed (if applicable) |
| `created_at` | Timestamp when the task was created |
| `credit_consumption` | Number of credits consumed by this task |
| `error` | Error details if the task failed |
| `id` |  |
| `input_parameters` | The input parameters used to create the task |
| `model` | Name of the AI model used for this task |
| `results` | Generated media files or output data. |
| `status` | Current status of the task |
| `task_id` | Unique identifier of the task |

Operations: Load.

API path: `/tasks/{task_id}`



## Entities


### Generate

Create an instance: `local generate = client:Generate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aspect_ratio` | `string` | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `string` | Optional webhook URL to receive task completion notification |
| `duration` | `number` | Duration of the video in seconds |
| `height` | `number` | Height of the generated image in pixels |
| `image_url` | `string` | Optional reference image URL for image-to-video generation |
| `model` | `string` | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `string` | Text description of what to avoid in the generated image |
| `num_images` | `number` | Number of images to generate |
| `prompt` | `string` | Text description of the image to generate |
| `status` | `string` | Initial status of the task |
| `task_id` | `string` | Unique identifier for the created task. |
| `width` | `number` | Width of the generated image in pixels |

#### Example: Create

```lua
local generate, err = client:Generate():create({
  model = "example_model", -- string
  prompt = "example_prompt", -- string
  status = "example_status", -- string
  task_id = "example_task_id", -- string
})
```


### Task

Create an instance: `local task = client:Task(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | Timestamp when the task was completed (if applicable) |
| `created_at` | `string` | Timestamp when the task was created |
| `credit_consumption` | `number` | Number of credits consumed by this task |
| `error` | `table` | Error details if the task failed |
| `id` | `string` |  |
| `input_parameters` | `table` | The input parameters used to create the task |
| `model` | `string` | Name of the AI model used for this task |
| `results` | `table` | Generated media files or output data. |
| `status` | `string` | Current status of the task |
| `task_id` | `string` | Unique identifier of the task |

#### Example: Load

```lua
local task, err = client:Task():load({ id = "task_id" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── crun-api-overview_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`crun-api-overview_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local task = client:Task()
task:load({ id = "example_id" })

-- task:data_get() now returns the task data from the last load
-- task:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
