# CrunApiOverview Lua SDK Reference

Complete API reference for the CrunApiOverview Lua SDK.


## CrunApiOverviewSDK

### Constructor

```lua
local sdk = require("crun-api-overview_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Generate(data)`

Create a new `Generate` entity instance. Pass `nil` for no initial data.

#### `Task(data)`

Create a new `Task` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## GenerateEntity

```lua
local generate = client:Generate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `string` | No |  |
| `callback_url` | `string` | No |  |
| `duration` | `number` | No |  |
| `height` | `number` | No |  |
| `image_url` | `string` | No |  |
| `model` | `string` | Yes |  |
| `negative_prompt` | `string` | No |  |
| `num_image` | `number` | No |  |
| `prompt` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `task_id` | `string` | Yes |  |
| `width` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Generate():create({
  model = --[[ string ]],
  prompt = --[[ string ]],
  status = --[[ string ]],
  task_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TaskEntity

```lua
local task = client:Task(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No |  |
| `created_at` | `string` | Yes |  |
| `credit_consumption` | `number` | No |  |
| `error` | `table` | No |  |
| `input_parameter` | `table` | No |  |
| `model` | `string` | Yes |  |
| `result` | `table` | No |  |
| `status` | `string` | Yes |  |
| `task_id` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Task():load({ id = "task_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TaskEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

