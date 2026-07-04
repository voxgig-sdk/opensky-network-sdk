# OpenskyNetwork Ruby SDK Reference

Complete API reference for the OpenskyNetwork Ruby SDK.


## OpenskyNetworkSDK

### Constructor

```ruby
require_relative 'opensky-network_sdk'

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
flight = client.flight
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival_airport_candidates_count` | ``$INTEGER`` | No |  |
| `callsign` | ``$STRING`` | No |  |
| `departure_airport_candidates_count` | ``$INTEGER`` | No |  |
| `est_arrival_airport` | ``$STRING`` | No |  |
| `est_arrival_airport_horiz_distance` | ``$INTEGER`` | No |  |
| `est_arrival_airport_vert_distance` | ``$INTEGER`` | No |  |
| `est_departure_airport` | ``$STRING`` | No |  |
| `est_departure_airport_horiz_distance` | ``$INTEGER`` | No |  |
| `est_departure_airport_vert_distance` | ``$INTEGER`` | No |  |
| `first_seen` | ``$INTEGER`` | No |  |
| `icao24` | ``$STRING`` | No |  |
| `last_seen` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.flight.list(nil)
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
state_vector = client.state_vector
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | ``$ARRAY`` | No |  |
| `time` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.state_vector.list(nil)
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
track = client.track
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | ``$STRING`` | No |  |
| `end_time` | ``$INTEGER`` | No |  |
| `icao24` | ``$STRING`` | No |  |
| `path` | ``$ARRAY`` | No |  |
| `start_time` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.track.list(nil)
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

