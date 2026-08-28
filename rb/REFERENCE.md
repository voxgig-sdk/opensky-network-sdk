# OpenskyNetwork Ruby SDK Reference

Complete API reference for the OpenskyNetwork Ruby SDK.


## OpenskyNetworkSDK

### Constructor

```ruby
require_relative 'OpenskyNetwork_sdk'

client = OpenskyNetworkSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenskyNetworkSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenskyNetworkSDK.test
```


### Instance Methods

#### `Flight(data = nil)`

Create a new `Flight` entity instance. Pass `nil` for no initial data.

#### `StateVector(data = nil)`

Create a new `StateVector` entity instance. Pass `nil` for no initial data.

#### `Track(data = nil)`

Create a new `Track` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## FlightEntity

```ruby
flight = client.Flight
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrivalAirportCandidatesCount` | `Integer` | No | Number of candidates for arrival airport |
| `callsign` | `String` | No | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `Integer` | No | Number of candidates for departure airport |
| `estArrivalAirport` | `String` | No | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `Integer` | No | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `Integer` | No | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `String` | No | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `Integer` | No | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `Integer` | No | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `Integer` | No | Unix timestamp (seconds) of the first position report |
| `icao24` | `String` | No | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `Integer` | No | Unix timestamp (seconds) of the last position report |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Flight.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FlightEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StateVectorEntity

```ruby
state_vector = client.StateVector
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `states` | `Array` | No | Array of state vectors |
| `time` | `Integer` | No | The time which the state vectors in this response are associated with. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.StateVector.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrackEntity

```ruby
track = client.Track
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | `String` | No | Callsign of the vehicle |
| `endTime` | `Integer` | No | Unix timestamp (seconds) of the end of the track |
| `icao24` | `String` | No | Unique ICAO 24-bit address of the transponder |
| `path` | `Array` | No | Array of waypoints representing the aircraft trajectory |
| `startTime` | `Integer` | No | Unix timestamp (seconds) of the start of the track |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Track.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OpenskyNetworkSDK.new({
  "feature" => {
    "test" => { "active" => true },
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

