# CrunApiOverview PHP SDK Reference

Complete API reference for the CrunApiOverview PHP SDK.


## CrunApiOverviewSDK

### Constructor

```php
require_once __DIR__ . '/crun-api-overview_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$generate = $client->generate();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->generate()->create([
  "model" => /* `$STRING` */,
  "prompt" => /* `$STRING` */,
  "status" => /* `$STRING` */,
  "task_id" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GenerateEntity`

Create a new `GenerateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TaskEntity

```php
$task = $client->task();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->task()->load(["id" => "task_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TaskEntity`

Create a new `TaskEntity` instance with the same client and
options.

#### `getName(): string`

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

