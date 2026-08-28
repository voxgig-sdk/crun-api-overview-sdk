# CrunApiOverview Ruby SDK



The Ruby SDK for the CrunApiOverview API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Generate` — with named operations (`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/crun-api-overview-sdk/releases](https://github.com/voxgig-sdk/crun-api-overview-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CrunApiOverview_sdk"

client = CrunApiOverviewSDK.new({
  "apikey" => ENV["CRUN_API_OVERVIEW_APIKEY"],
})
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Generate record.
created = client.Generate.create({ "model" => "example_model", "prompt" => "example_prompt", "status" => "example_status", "task_id" => "example_task_id" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  task = client.Task.load({ "id" => "example_id" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = CrunApiOverviewSDK.test({
  "entity" => { "task" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
task = client.Task.load({ "id" => "test01" })
puts task
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CrunApiOverviewSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CrunApiOverviewSDK

```ruby
require_relative "CrunApiOverview_sdk"
client = CrunApiOverviewSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CrunApiOverviewSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CrunApiOverviewSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Generate` | `(data) -> GenerateEntity` | Create a Generate entity instance. |
| `Task` | `(data) -> TaskEntity` | Create a Task entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CrunApiOverviewError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `generate = client.Generate`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aspect_ratio` | `String` | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `String` | Optional webhook URL to receive task completion notification |
| `duration` | `Float` | Duration of the video in seconds |
| `height` | `Integer` | Height of the generated image in pixels |
| `image_url` | `String` | Optional reference image URL for image-to-video generation |
| `model` | `String` | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `String` | Text description of what to avoid in the generated image |
| `num_images` | `Integer` | Number of images to generate |
| `prompt` | `String` | Text description of the image to generate |
| `status` | `String` | Initial status of the task |
| `task_id` | `String` | Unique identifier for the created task. |
| `width` | `Integer` | Width of the generated image in pixels |

#### Example: Create

```ruby
generate = client.Generate.create({
  "model" => "example_model", # String
  "prompt" => "example_prompt", # String
  "status" => "example_status", # String
  "task_id" => "example_task_id", # String
})
```


### Task

Create an instance: `task = client.Task`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `String` | Timestamp when the task was completed (if applicable) |
| `created_at` | `String` | Timestamp when the task was created |
| `credit_consumption` | `Float` | Number of credits consumed by this task |
| `error` | `Hash` | Error details if the task failed |
| `id` | `String` |  |
| `input_parameters` | `Hash` | The input parameters used to create the task |
| `model` | `String` | Name of the AI model used for this task |
| `results` | `Array` | Generated media files or output data. |
| `status` | `String` | Current status of the task |
| `task_id` | `String` | Unique identifier of the task |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Task record (raises on error).
task = client.Task.load({ "id" => "task_id" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CrunApiOverview_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CrunApiOverview_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
task = client.Task
task.load({ "id" => "example_id" })

# task.data_get now returns the task data from the last load
# task.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
