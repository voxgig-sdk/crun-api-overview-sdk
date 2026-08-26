# CrunApiOverview Golang SDK Reference

Complete API reference for the CrunApiOverview Golang SDK.


## CrunApiOverviewSDK

### Constructor

```go
func NewCrunApiOverviewSDK(options map[string]any) *CrunApiOverviewSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CrunApiOverviewSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CrunApiOverviewSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Generate(data map[string]any) CrunApiOverviewEntity`

Create a new `Generate` entity instance. Pass `nil` for no initial data.

#### `Task(data map[string]any) CrunApiOverviewEntity`

Create a new `Task` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GenerateEntity

```go
generate := client.Generate(nil)
fmt.Println(generate.GetName()) // "generate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `string` | No | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `string` | No | Optional webhook URL to receive task completion notification |
| `duration` | `float64` | No | Duration of the video in seconds |
| `height` | `int` | No | Height of the generated image in pixels |
| `image_url` | `string` | No | Optional reference image URL for image-to-video generation |
| `model` | `string` | Yes | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `string` | No | Text description of what to avoid in the generated image |
| `num_images` | `int` | No | Number of images to generate |
| `prompt` | `string` | Yes | Text description of the image to generate |
| `status` | `string` | Yes | Initial status of the task |
| `task_id` | `string` | Yes | Unique identifier for the created task. |
| `width` | `int` | No | Width of the generated image in pixels |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Generate(nil).Create(map[string]any{
    "model": "example_model",
    "prompt": "example_prompt",
    "status": "example_status",
    "task_id": "example_task_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GenerateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TaskEntity

```go
task := client.Task(nil)
fmt.Println(task.GetName()) // "task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | Timestamp when the task was completed (if applicable) |
| `created_at` | `string` | Yes | Timestamp when the task was created |
| `credit_consumption` | `float64` | No | Number of credits consumed by this task |
| `error` | `map[string]any` | No | Error details if the task failed |
| `id` | `string` | No |  |
| `input_parameters` | `map[string]any` | No | The input parameters used to create the task |
| `model` | `string` | Yes | Name of the AI model used for this task |
| `results` | `[]any` | No | Generated media files or output data. |
| `status` | `string` | Yes | Current status of the task |
| `task_id` | `string` | Yes | Unique identifier of the task |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Task(nil).Load(map[string]any{"id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TaskEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCrunApiOverviewSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

