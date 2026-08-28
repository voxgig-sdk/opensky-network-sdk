# OpenskyNetwork Lua SDK Reference

Complete API reference for the OpenskyNetwork Lua SDK.


## OpenskyNetworkSDK

### Constructor

```lua
local sdk = require("opensky-network_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Flight(data)`

Create a new `Flight` entity instance. Pass `nil` for no initial data.

#### `StateVector(data)`

Create a new `StateVector` entity instance. Pass `nil` for no initial data.

#### `Track(data)`

Create a new `Track` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## FlightEntity

```lua
local flight = client:Flight(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrivalAirportCandidatesCount` | `number` | No | Number of candidates for arrival airport |
| `callsign` | `string` | No | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `number` | No | Number of candidates for departure airport |
| `estArrivalAirport` | `string` | No | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `number` | No | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `number` | No | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `string` | No | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `number` | No | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `number` | No | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `number` | No | Unix timestamp (seconds) of the first position report |
| `icao24` | `string` | No | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `number` | No | Unix timestamp (seconds) of the last position report |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Flight():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlightEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StateVectorEntity

```lua
local state_vector = client:StateVector(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `states` | `table` | No | Array of state vectors |
| `time` | `number` | No | The time which the state vectors in this response are associated with. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:StateVector():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TrackEntity

```lua
local track = client:Track(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | `string` | No | Callsign of the vehicle |
| `endTime` | `number` | No | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | No | Unique ICAO 24-bit address of the transponder |
| `path` | `table` | No | Array of waypoints representing the aircraft trajectory |
| `startTime` | `number` | No | Unix timestamp (seconds) of the start of the track |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Track():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

