# CrunApiOverview TypeScript SDK Reference

Complete API reference for the CrunApiOverview TypeScript SDK.


## CrunApiOverviewSDK

### Constructor

```ts
new CrunApiOverviewSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CrunApiOverviewSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CrunApiOverviewSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CrunApiOverviewSDK` instance in test mode.


### Instance Methods

#### `Generate(data?: object)`

Create a new `Generate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenerateEntity` instance.

#### `Task(data?: object)`

Create a new `Task` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TaskEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CrunApiOverviewSDK.test()`.

**Returns:** `CrunApiOverviewSDK` instance in test mode.


---

## GenerateEntity

```ts
const generate = client.generate
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.generate.create({
  model: /* `$STRING` */,
  prompt: /* `$STRING` */,
  status: /* `$STRING` */,
  task_id: /* `$STRING` */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenerateEntity` instance with the same client and
options.

#### `client()`

Return the parent `CrunApiOverviewSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TaskEntity

```ts
const task = client.task
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.task.load({ id: 'task_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `CrunApiOverviewSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CrunApiOverviewSDK({
  feature: {
    test: { active: true },
  }
})
```

