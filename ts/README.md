# CrunApiOverview TypeScript SDK



The TypeScript SDK for the CrunApiOverview API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Generate()` — each with a small set of operations (`load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/crun-api-overview-sdk/releases](https://github.com/voxgig-sdk/crun-api-overview-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CrunApiOverviewSDK } from '@voxgig-sdk/crun-api-overview'

const client = new CrunApiOverviewSDK({
  apikey: process.env.CRUN_API_OVERVIEW_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created Generate ENTITY (.data() for the record)
const created = await client.Generate().create({
  model: 'example_model',
  prompt: 'example_prompt',
  status: 'example_status',
  task_id: 'example_task_id',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const task = await client.Task().load({ id: "example_id" })
  console.log(task)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CrunApiOverviewSDK.test()

const task = await client.Task().load({ id: 'test01' })
// task is the entity, populated with mock response data
// — call task.data() for the record itself
console.log(task)
```

You can also use the instance method:

```ts
const client = new CrunApiOverviewSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Task()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CrunApiOverviewSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CRUN_API_OVERVIEW_TEST_LIVE=TRUE
CRUN_API_OVERVIEW_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CrunApiOverviewSDK

#### Constructor

```ts
new CrunApiOverviewSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Generate(data?)` | `GenerateEntity` | Create a Generate entity instance. |
| `Task(data?)` | `TaskEntity` | Create a Task entity instance. |
| `tester(testopts?, sdkopts?)` | `CrunApiOverviewSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CrunApiOverviewSDK.test(testopts?, sdkopts?)` | `CrunApiOverviewSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CrunApiOverviewSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Generate

| Field | Description |
| --- | --- |
| `aspect_ratio` | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | Optional webhook URL to receive task completion notification |
| `duration` | Duration of the video in seconds |
| `height` | Height of the generated image in pixels |
| `image_url` | Optional reference image URL for image-to-video generation |
| `model` | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | Text description of what to avoid in the generated image |
| `num_images` | Number of images to generate |
| `prompt` | Text description of the image to generate |
| `status` | Initial status of the task |
| `task_id` | Unique identifier for the created task. |
| `width` | Width of the generated image in pixels |

Operations: create.

API path: `/image/generate`

#### Task

| Field | Description |
| --- | --- |
| `completed_at` | Timestamp when the task was completed (if applicable) |
| `created_at` | Timestamp when the task was created |
| `credit_consumption` | Number of credits consumed by this task |
| `error` | Error details if the task failed |
| `id` |  |
| `input_parameters` | The input parameters used to create the task |
| `model` | Name of the AI model used for this task |
| `results` | Generated media files or output data. |
| `status` | Current status of the task |
| `task_id` | Unique identifier of the task |

Operations: load.

API path: `/tasks/{task_id}`



## Entities


### Generate

Create an instance: `const generate = client.Generate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aspect_ratio` | `string` | Aspect ratio of the video (e.g., 16:9, 9:16, 1:1) |
| `callback_url` | `string` | Optional webhook URL to receive task completion notification |
| `duration` | `number` | Duration of the video in seconds |
| `height` | `number` | Height of the generated image in pixels |
| `image_url` | `string` | Optional reference image URL for image-to-video generation |
| `model` | `string` | Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine) |
| `negative_prompt` | `string` | Text description of what to avoid in the generated image |
| `num_images` | `number` | Number of images to generate |
| `prompt` | `string` | Text description of the image to generate |
| `status` | `string` | Initial status of the task |
| `task_id` | `string` | Unique identifier for the created task. |
| `width` | `number` | Width of the generated image in pixels |

#### Example: Create

```ts
const generate = await client.Generate().create({
  model: 'example_model',
  prompt: 'example_prompt',
  status: 'example_status',
  task_id: 'example_task_id',
})
```


### Task

Create an instance: `const task = client.Task()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | Timestamp when the task was completed (if applicable) |
| `created_at` | `string` | Timestamp when the task was created |
| `credit_consumption` | `number` | Number of credits consumed by this task |
| `error` | `Record<string, any>` | Error details if the task failed |
| `id` | `string` |  |
| `input_parameters` | `Record<string, any>` | The input parameters used to create the task |
| `model` | `string` | Name of the AI model used for this task |
| `results` | `any[]` | Generated media files or output data. |
| `status` | `string` | Current status of the task |
| `task_id` | `string` | Unique identifier of the task |

#### Example: Load

```ts
const task = await client.Task().load({ id: 'task_id' })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
crun-api-overview/
├── src/
│   ├── CrunApiOverviewSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CrunApiOverviewSDK } from '@voxgig-sdk/crun-api-overview'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const task = client.Task()
await task.load({ id: "example_id" })

// task.data() now returns the task data from the last `load`
// task.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
