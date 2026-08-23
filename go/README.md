# OpenskyNetwork Golang SDK



The Golang SDK for the OpenskyNetwork API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Flight(nil)` — each with the same small set of operations (`List`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/opensky-network-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/opensky-network-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/opensky-network-sdk/go=../opensky-network-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/opensky-network-sdk/go"
)

func main() {
    client := sdk.NewOpenskyNetworkSDK(map[string]any{
        "apikey": os.Getenv("OPENSKY_NETWORK_APIKEY"),
    })

    // List flight records — the value is the array of records itself.
    flights, err := client.Flight(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range flights.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
tracks, err := client.Track(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = tracks
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

track, err := client.Track(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(track) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenskyNetworkSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
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
cd go && go test ./test/...
```


## Reference

### NewOpenskyNetworkSDK

```go
func NewOpenskyNetworkSDK(options map[string]any) *OpenskyNetworkSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenskyNetworkSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenskyNetworkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Flight` | `(data map[string]any) OpenskyNetworkEntity` | Create a Flight entity instance. |
| `StateVector` | `(data map[string]any) OpenskyNetworkEntity` | Create a StateVector entity instance. |
| `Track` | `(data map[string]any) OpenskyNetworkEntity` | Create a Track entity instance. |

### Entity interface (OpenskyNetworkEntity)

All entities implement the `OpenskyNetworkEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    flight, err := client.Flight(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // flight is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Flight

| Field | Description |
| --- | --- |
| `"arrivalAirportCandidatesCount"` | Number of candidates for arrival airport |
| `"callsign"` | Callsign of the vehicle (8 chars) |
| `"departureAirportCandidatesCount"` | Number of candidates for departure airport |
| `"estArrivalAirport"` | Estimated arrival airport ICAO code |
| `"estArrivalAirportHorizDistance"` | Horizontal distance to estimated arrival airport in meters |
| `"estArrivalAirportVertDistance"` | Vertical distance to estimated arrival airport in meters |
| `"estDepartureAirport"` | Estimated departure airport ICAO code |
| `"estDepartureAirportHorizDistance"` | Horizontal distance to estimated departure airport in meters |
| `"estDepartureAirportVertDistance"` | Vertical distance to estimated departure airport in meters |
| `"firstSeen"` | Unix timestamp (seconds) of the first position report |
| `"icao24"` | Unique ICAO 24-bit address of the transponder in hex string representation |
| `"lastSeen"` | Unix timestamp (seconds) of the last position report |

Operations: List.

API path: `/flights/aircraft`

#### StateVector

| Field | Description |
| --- | --- |
| `"states"` | Array of state vectors |
| `"time"` | The time which the state vectors in this response are associated with. |

Operations: List.

API path: `/states/all`

#### Track

| Field | Description |
| --- | --- |
| `"callsign"` | Callsign of the vehicle |
| `"endTime"` | Unix timestamp (seconds) of the end of the track |
| `"icao24"` | Unique ICAO 24-bit address of the transponder |
| `"path"` | Array of waypoints representing the aircraft trajectory |
| `"startTime"` | Unix timestamp (seconds) of the start of the track |

Operations: List.

API path: `/tracks`



## Entities


### Flight

Create an instance: `flight := client.Flight(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrivalAirportCandidatesCount` | `int` | Number of candidates for arrival airport |
| `callsign` | `string` | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `int` | Number of candidates for departure airport |
| `estArrivalAirport` | `string` | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `int` | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `int` | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `string` | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `int` | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `int` | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `int` | Unix timestamp (seconds) of the first position report |
| `icao24` | `string` | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `int` | Unix timestamp (seconds) of the last position report |

#### Example: List

```go
flights, err := client.Flight(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(flights) // the array of records
```


### StateVector

Create an instance: `stateVector := client.StateVector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `states` | `[]any` | Array of state vectors |
| `time` | `int` | The time which the state vectors in this response are associated with. |

#### Example: List

```go
stateVectors, err := client.StateVector(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(stateVectors) // the array of records
```


### Track

Create an instance: `track := client.Track(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callsign` | `string` | Callsign of the vehicle |
| `endTime` | `int` | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | Unique ICAO 24-bit address of the transponder |
| `path` | `[]any` | Array of waypoints representing the aircraft trajectory |
| `startTime` | `int` | Unix timestamp (seconds) of the start of the track |

#### Example: List

```go
tracks, err := client.Track(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tracks) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/opensky-network-sdk/go/
├── opensky-network.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/opensky-network-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
track := client.Track(nil)
track.List(nil, nil)

// track.Data() now returns the track data from the last list
// track.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
