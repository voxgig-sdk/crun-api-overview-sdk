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
const generate = client.Generate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aspect_ratio` | `string` | No | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `string` | No | Optional webhook URL to receive task completion notification |
| `duration` | `number` | No | Duration of the video in seconds |
| `height` | `number` | No | Height of the generated image in pixels |
| `image_url` | `string` | No | Optional reference image URL for image-to-video generation |
| `model` | `string` | Yes | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `string` | No | Text description of what to avoid in the generated image |
| `num_images` | `number` | No | Number of images to generate |
| `prompt` | `string` | Yes | Text description of the image to generate |
| `status` | `string` | Yes | Initial status of the task |
| `task_id` | `string` | Yes | Unique identifier for the created task. |
| `width` | `number` | No | Width of the generated image in pixels |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Generate().create({
  model: 'example_model',
  prompt: 'example_prompt',
  status: 'example_status',
  task_id: 'example_task_id',
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
const task = client.Task()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | Timestamp when the task was completed (if applicable) |
| `created_at` | `string` | Yes | Timestamp when the task was created |
| `credit_consumption` | `number` | No | Number of credits consumed by this task |
| `error` | `Record<string, any>` | No | Error details if the task failed |
| `input_parameters` | `Record<string, any>` | No | The input parameters used to create the task |
| `model` | `string` | Yes | Name of the AI model used for this task |
| `results` | `any[]` | No | Generated media files or output data. |
| `status` | `string` | Yes | Current status of the task |
| `task_id` | `string` | Yes | Unique identifier of the task |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Task().load({ id: 'task_id' })
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

