# CrunApiOverview Python SDK Reference

Complete API reference for the CrunApiOverview Python SDK.


## CrunApiOverviewSDK

### Constructor

```python
from crunapioverview_sdk import CrunApiOverviewSDK

client = CrunApiOverviewSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CrunApiOverviewSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CrunApiOverviewSDK.test()
```


### Instance Methods

#### `Generate(data=None)`

Create a new `GenerateEntity` instance. Pass `None` for no initial data.

#### `Task(data=None)`

Create a new `TaskEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GenerateEntity

```python
generate = client.Generate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `str` | No | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `str` | No | Optional webhook URL to receive task completion notification |
| `duration` | `float` | No | Duration of the video in seconds |
| `height` | `int` | No | Height of the generated image in pixels |
| `image_url` | `str` | No | Optional reference image URL for image-to-video generation |
| `model` | `str` | Yes | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `str` | No | Text description of what to avoid in the generated image |
| `num_images` | `int` | No | Number of images to generate |
| `prompt` | `str` | Yes | Text description of the image to generate |
| `status` | `str` | Yes | Initial status of the task |
| `task_id` | `str` | Yes | Unique identifier for the created task. |
| `width` | `int` | No | Width of the generated image in pixels |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Generate().create({
    "model": "example_model",  # str
    "prompt": "example_prompt",  # str
    "status": "example_status",  # str
    "task_id": "example_task_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TaskEntity

```python
task = client.Task()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | Timestamp when the task was completed (if applicable) |
| `created_at` | `str` | Yes | Timestamp when the task was created |
| `credit_consumption` | `float` | No | Number of credits consumed by this task |
| `error` | `dict` | No | Error details if the task failed |
| `input_parameters` | `dict` | No | The input parameters used to create the task |
| `model` | `str` | Yes | Name of the AI model used for this task |
| `results` | `list` | No | Generated media files or output data. |
| `status` | `str` | Yes | Current status of the task |
| `task_id` | `str` | Yes | Unique identifier of the task |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Task().load({"id": "task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TaskEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CrunApiOverviewSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

