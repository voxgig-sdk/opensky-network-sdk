# OpenskyNetwork TypeScript SDK Reference

Complete API reference for the OpenskyNetwork TypeScript SDK.


## OpenskyNetworkSDK

### Constructor

```ts
new OpenskyNetworkSDK(options?: object)
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

#### `OpenskyNetworkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenskyNetworkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenskyNetworkSDK` instance in test mode.


### Instance Methods

#### `Flight(data?: object)`

Create a new `Flight` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FlightEntity` instance.

#### `StateVector(data?: object)`

Create a new `StateVector` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StateVectorEntity` instance.

#### `Track(data?: object)`

Create a new `Track` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrackEntity` instance.

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

Alias for `OpenskyNetworkSDK.test()`.

**Returns:** `OpenskyNetworkSDK` instance in test mode.


---

## FlightEntity

```ts
const flight = client.Flight()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrivalAirportCandidatesCount` | `number` | No |  |
| `callsign` | `string` | No |  |
| `departureAirportCandidatesCount` | `number` | No |  |
| `estArrivalAirport` | `string` | No |  |
| `estArrivalAirportHorizDistance` | `number` | No |  |
| `estArrivalAirportVertDistance` | `number` | No |  |
| `estDepartureAirport` | `string` | No |  |
| `estDepartureAirportHorizDistance` | `number` | No |  |
| `estDepartureAirportVertDistance` | `number` | No |  |
| `firstSeen` | `number` | No |  |
| `icao24` | `string` | No |  |
| `lastSeen` | `number` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `aircraft` | `/flights/aircraft` | `client.Flight().list({ $action: 'aircraft', ... })` |
| `all` | `/flights/all` | `client.Flight().list({ $action: 'all', ... })` |
| `arrival` | `/flights/arrival` | `client.Flight().list({ $action: 'arrival', ... })` |
| `departure` | `/flights/departure` | `client.Flight().list({ $action: 'departure', ... })` |

An action returns that action's OWN response, which is not necessarily a
Flight record — check the API definition for its shape.

```ts
const result = await client.Flight().list({
  $action: 'aircraft',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Flight().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FlightEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenskyNetworkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StateVectorEntity

```ts
const state_vector = client.StateVector()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `states` | `any[]` | No |  |
| `time` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.StateVector().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenskyNetworkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrackEntity

```ts
const track = client.Track()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | `string` | No |  |
| `endTime` | `number` | No |  |
| `icao24` | `string` | No |  |
| `path` | `any[]` | No |  |
| `startTime` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Track().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrackEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenskyNetworkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenskyNetworkSDK({
  feature: {
    test: { active: true },
  }
})
```

