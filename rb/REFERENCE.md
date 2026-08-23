# CrunApiOverview Ruby SDK Reference

Complete API reference for the CrunApiOverview Ruby SDK.


## CrunApiOverviewSDK

### Constructor

```ruby
require_relative 'CrunApiOverview_sdk'

client = CrunApiOverviewSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CrunApiOverviewSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CrunApiOverviewSDK.test
```


### Instance Methods

#### `Generate(data = nil)`

Create a new `Generate` entity instance. Pass `nil` for no initial data.

#### `Task(data = nil)`

Create a new `Task` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GenerateEntity

```ruby
generate = client.Generate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `String` | No | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `String` | No | Optional webhook URL to receive task completion notification |
| `duration` | `Float` | No | Duration of the video in seconds |
| `height` | `Integer` | No | Height of the generated image in pixels |
| `image_url` | `String` | No | Optional reference image URL for image-to-video generation |
| `model` | `String` | Yes | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `String` | No | Text description of what to avoid in the generated image |
| `num_images` | `Integer` | No | Number of images to generate |
| `prompt` | `String` | Yes | Text description of the image to generate |
| `status` | `String` | Yes | Initial status of the task |
| `task_id` | `String` | Yes | Unique identifier for the created task. |
| `width` | `Integer` | No | Width of the generated image in pixels |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Generate.create({
  "model" => "example_model", # String
  "prompt" => "example_prompt", # String
  "status" => "example_status", # String
  "task_id" => "example_task_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GenerateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TaskEntity

```ruby
task = client.Task
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `String` | No | Timestamp when the task was completed (if applicable) |
| `created_at` | `String` | Yes | Timestamp when the task was created |
| `credit_consumption` | `Float` | No | Number of credits consumed by this task |
| `error` | `Hash` | No | Error details if the task failed |
| `input_parameters` | `Hash` | No | The input parameters used to create the task |
| `model` | `String` | Yes | Name of the AI model used for this task |
| `results` | `Array` | No | Generated media files or output data. |
| `status` | `String` | Yes | Current status of the task |
| `task_id` | `String` | Yes | Unique identifier of the task |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Task.load({ "id" => "task_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TaskEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CrunApiOverviewSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

