# CrunApiOverview Python SDK Reference

Complete API reference for the CrunApiOverview Python SDK.


## CrunApiOverviewSDK

### Constructor

```python
from crun-api-overview_sdk import CrunApiOverviewSDK

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
generate = client.generate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | ``$STRING`` | No |  |
| `callback_url` | ``$STRING`` | No |  |
| `duration` | ``$NUMBER`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `model` | ``$STRING`` | Yes |  |
| `negative_prompt` | ``$STRING`` | No |  |
| `num_image` | ``$INTEGER`` | No |  |
| `prompt` | ``$STRING`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |
| `task_id` | ``$STRING`` | Yes |  |
| `width` | ``$INTEGER`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.generate.create({
    "model": # `$STRING`,
    "prompt": # `$STRING`,
    "status": # `$STRING`,
    "task_id": # `$STRING`,
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
task = client.task
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | Yes |  |
| `credit_consumption` | ``$NUMBER`` | No |  |
| `error` | ``$OBJECT`` | No |  |
| `input_parameter` | ``$OBJECT`` | No |  |
| `model` | ``$STRING`` | Yes |  |
| `result` | ``$ARRAY`` | No |  |
| `status` | ``$STRING`` | Yes |  |
| `task_id` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.task.load({"id": "task_id"})
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

