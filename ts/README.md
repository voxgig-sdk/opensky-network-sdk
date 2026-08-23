# OpenskyNetwork TypeScript SDK



The TypeScript SDK for the OpenskyNetwork API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Flight()` — each with a small set of operations (`list`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/opensky-network-sdk/releases](https://github.com/voxgig-sdk/opensky-network-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenskyNetworkSDK } from '@voxgig-sdk/opensky-network'

const client = new OpenskyNetworkSDK({
  apikey: process.env.OPENSKY_NETWORK_APIKEY,
})
```

### 2. List flight records

`list()` resolves to an array of Flight ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const flights = await client.Flight().list()

for (const flight of flights) {
  console.log(flight)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const tracks = await client.Track().list()
  console.log(tracks)
} catch (err) {
  console.error('list failed:', err)
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
const client = OpenskyNetworkSDK.test()

const track = await client.Track().list()
// track is the entity, populated with mock response data
// — call track.data() for the record itself
console.log(track)
```

You can also use the instance method:

```ts
const client = new OpenskyNetworkSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Track()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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

const client = new OpenskyNetworkSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENSKY_NETWORK_TEST_LIVE=TRUE
OPENSKY_NETWORK_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### OpenskyNetworkSDK

#### Constructor

```ts
new OpenskyNetworkSDK(options?: {
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
| `Flight(data?)` | `FlightEntity` | Create a Flight entity instance. |
| `StateVector(data?)` | `StateVectorEntity` | Create a StateVector entity instance. |
| `Track(data?)` | `TrackEntity` | Create a Track entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenskyNetworkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenskyNetworkSDK.test(testopts?, sdkopts?)` | `OpenskyNetworkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenskyNetworkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

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

#### Flight

| Field | Description |
| --- | --- |
| `arrivalAirportCandidatesCount` | Number of candidates for arrival airport |
| `callsign` | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | Number of candidates for departure airport |
| `estArrivalAirport` | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | Vertical distance to estimated departure airport in meters |
| `firstSeen` | Unix timestamp (seconds) of the first position report |
| `icao24` | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | Unix timestamp (seconds) of the last position report |

Operations: list.

API path: `/flights/aircraft`

#### StateVector

| Field | Description |
| --- | --- |
| `states` | Array of state vectors |
| `time` | The time which the state vectors in this response are associated with. |

Operations: list.

API path: `/states/all`

#### Track

| Field | Description |
| --- | --- |
| `callsign` | Callsign of the vehicle |
| `endTime` | Unix timestamp (seconds) of the end of the track |
| `icao24` | Unique ICAO 24-bit address of the transponder |
| `path` | Array of waypoints representing the aircraft trajectory |
| `startTime` | Unix timestamp (seconds) of the start of the track |

Operations: list.

API path: `/tracks`



## Entities


### Flight

Create an instance: `const flight = client.Flight()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrivalAirportCandidatesCount` | `number` | Number of candidates for arrival airport |
| `callsign` | `string` | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `number` | Number of candidates for departure airport |
| `estArrivalAirport` | `string` | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `number` | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `number` | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `string` | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `number` | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `number` | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `number` | Unix timestamp (seconds) of the first position report |
| `icao24` | `string` | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `number` | Unix timestamp (seconds) of the last position report |

#### Example: List

```ts
const flights = await client.Flight().list()
```


### StateVector

Create an instance: `const state_vector = client.StateVector()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `states` | `any[]` | Array of state vectors |
| `time` | `number` | The time which the state vectors in this response are associated with. |

#### Example: List

```ts
const state_vectors = await client.StateVector().list()
```


### Track

Create an instance: `const track = client.Track()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callsign` | `string` | Callsign of the vehicle |
| `endTime` | `number` | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | Unique ICAO 24-bit address of the transponder |
| `path` | `any[]` | Array of waypoints representing the aircraft trajectory |
| `startTime` | `number` | Unix timestamp (seconds) of the start of the track |

#### Example: List

```ts
const tracks = await client.Track().list()
```


## Open types

2 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `state_vector` | `states` | 5 | 2 levels |
| `track` | `path` | 3 | 2 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

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
opensky-network/
├── src/
│   ├── OpenskyNetworkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenskyNetworkSDK } from '@voxgig-sdk/opensky-network'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const track = client.Track()
await track.list()

// track.data() now returns the track data from the last `list`
// track.match() returns the last match criteria
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
