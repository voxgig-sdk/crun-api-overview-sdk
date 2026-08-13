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
| `aspect_ratio` | `String` | No |  |
| `callback_url` | `String` | No |  |
| `duration` | `Float` | No |  |
| `height` | `Integer` | No |  |
| `image_url` | `String` | No |  |
| `model` | `String` | Yes |  |
| `negative_prompt` | `String` | No |  |
| `num_images` | `Integer` | No |  |
| `prompt` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `task_id` | `String` | Yes |  |
| `width` | `Integer` | No |  |

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
| `completed_at` | `String` | No |  |
| `created_at` | `String` | Yes |  |
| `credit_consumption` | `Float` | No |  |
| `error` | `Hash` | No |  |
| `input_parameters` | `Hash` | No |  |
| `model` | `String` | Yes |  |
| `results` | `Array` | No |  |
| `status` | `String` | Yes |  |
| `task_id` | `String` | Yes |  |

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

