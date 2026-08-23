# OpenskyNetwork Golang SDK Reference

Complete API reference for the OpenskyNetwork Golang SDK.


## OpenskyNetworkSDK

### Constructor

```go
func NewOpenskyNetworkSDK(options map[string]any) *OpenskyNetworkSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *OpenskyNetworkSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *OpenskyNetworkSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Flight(data map[string]any) OpenskyNetworkEntity`

Create a new `Flight` entity instance. Pass `nil` for no initial data.

#### `StateVector(data map[string]any) OpenskyNetworkEntity`

Create a new `StateVector` entity instance. Pass `nil` for no initial data.

#### `Track(data map[string]any) OpenskyNetworkEntity`

Create a new `Track` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## FlightEntity

```go
flight := client.Flight(nil)
fmt.Println(flight.GetName()) // "flight"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrivalAirportCandidatesCount` | `int` | No | Number of candidates for arrival airport |
| `callsign` | `string` | No | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `int` | No | Number of candidates for departure airport |
| `estArrivalAirport` | `string` | No | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `int` | No | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `int` | No | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `string` | No | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `int` | No | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `int` | No | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `int` | No | Unix timestamp (seconds) of the first position report |
| `icao24` | `string` | No | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `int` | No | Unix timestamp (seconds) of the last position report |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Flight(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FlightEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StateVectorEntity

```go
stateVector := client.StateVector(nil)
fmt.Println(stateVector.GetName()) // "state_vector"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `states` | `[]any` | No | Array of state vectors |
| `time` | `int` | No | The time which the state vectors in this response are associated with. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.StateVector(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrackEntity

```go
track := client.Track(nil)
fmt.Println(track.GetName()) // "track"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | `string` | No | Callsign of the vehicle |
| `endTime` | `int` | No | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | No | Unique ICAO 24-bit address of the transponder |
| `path` | `[]any` | No | Array of waypoints representing the aircraft trajectory |
| `startTime` | `int` | No | Unix timestamp (seconds) of the start of the track |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Track(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrackEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewOpenskyNetworkSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

