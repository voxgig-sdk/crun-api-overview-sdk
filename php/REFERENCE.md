# CrunApiOverview PHP SDK Reference

Complete API reference for the CrunApiOverview PHP SDK.


## CrunApiOverviewSDK

### Constructor

```php
require_once __DIR__ . '/crunapioverview_sdk.php';

$client = new CrunApiOverviewSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CrunApiOverviewSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CrunApiOverviewSDK::test();
```


### Instance Methods

#### `Generate($data = null)`

Create a new `GenerateEntity` instance. Pass `null` for no initial data.

#### `Task($data = null)`

Create a new `TaskEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CrunApiOverviewUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GenerateEntity

```php
$generate = $client->Generate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `string` | No | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `string` | No | Optional webhook URL to receive task completion notification |
| `duration` | `float` | No | Duration of the video in seconds |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Generate()->create([
  "model" => null, // string
  "prompt" => null, // string
  "status" => null, // string
  "task_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GenerateEntity`

Create a new `GenerateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TaskEntity

```php
$task = $client->Task();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | Timestamp when the task was completed (if applicable) |
| `created_at` | `string` | Yes | Timestamp when the task was created |
| `credit_consumption` | `float` | No | Number of credits consumed by this task |
| `error` | `array` | No | Error details if the task failed |
| `id` | `string` | No |  |
| `input_parameters` | `array` | No | The input parameters used to create the task |
| `model` | `string` | Yes | Name of the AI model used for this task |
| `results` | `array` | No | Generated media files or output data. |
| `status` | `string` | Yes | Current status of the task |
| `task_id` | `string` | Yes | Unique identifier of the task |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Task()->load(["id" => "task_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TaskEntity`

Create a new `TaskEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CrunApiOverviewSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

