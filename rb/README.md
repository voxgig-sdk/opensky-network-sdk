# OpenskyNetwork Ruby SDK



The Ruby SDK for the OpenskyNetwork API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Flight` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/opensky-network-sdk/releases](https://github.com/voxgig-sdk/opensky-network-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "OpenskyNetwork_sdk"

client = OpenskyNetworkSDK.new({
  "apikey" => ENV["OPENSKY_NETWORK_APIKEY"],
})
```

### 2. List flight records

```ruby
begin
  # list returns an Array of Flight records — iterate directly.
  flights = client.Flight.list
  flights.each do |item|
    puts "#{item["arrivalAirportCandidatesCount"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  tracks = client.Track.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = OpenskyNetworkSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
track = client.Track.list()
puts track
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OpenskyNetworkSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OpenskyNetworkSDK

```ruby
require_relative "OpenskyNetwork_sdk"
client = OpenskyNetworkSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OpenskyNetworkSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenskyNetworkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Flight` | `(data) -> FlightEntity` | Create a Flight entity instance. |
| `StateVector` | `(data) -> StateVectorEntity` | Create a StateVector entity instance. |
| `Track` | `(data) -> TrackEntity` | Create a Track entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `OpenskyNetworkError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Operations: List.

API path: `/flights/aircraft`

#### StateVector

| Field | Description |
| --- | --- |
| `states` | Array of state vectors |
| `time` | The time which the state vectors in this response are associated with. |

Operations: List.

API path: `/states/all`

#### Track

| Field | Description |
| --- | --- |
| `callsign` | Callsign of the vehicle |
| `endTime` | Unix timestamp (seconds) of the end of the track |
| `icao24` | Unique ICAO 24-bit address of the transponder |
| `path` | Array of waypoints representing the aircraft trajectory |
| `startTime` | Unix timestamp (seconds) of the start of the track |

Operations: List.

API path: `/tracks`



## Entities


### Flight

Create an instance: `flight = client.Flight`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrivalAirportCandidatesCount` | `Integer` | Number of candidates for arrival airport |
| `callsign` | `String` | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `Integer` | Number of candidates for departure airport |
| `estArrivalAirport` | `String` | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `Integer` | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `Integer` | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `String` | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `Integer` | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `Integer` | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `Integer` | Unix timestamp (seconds) of the first position report |
| `icao24` | `String` | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `Integer` | Unix timestamp (seconds) of the last position report |

#### Example: List

```ruby
# list returns an Array of Flight records (raises on error).
flights = client.Flight.list
```


### StateVector

Create an instance: `state_vector = client.StateVector`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `states` | `Array` | Array of state vectors |
| `time` | `Integer` | The time which the state vectors in this response are associated with. |

#### Example: List

```ruby
# list returns an Array of StateVector records (raises on error).
state_vectors = client.StateVector.list
```


### Track

Create an instance: `track = client.Track`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callsign` | `String` | Callsign of the vehicle |
| `endTime` | `Integer` | Unix timestamp (seconds) of the end of the track |
| `icao24` | `String` | Unique ICAO 24-bit address of the transponder |
| `path` | `Array` | Array of waypoints representing the aircraft trajectory |
| `startTime` | `Integer` | Unix timestamp (seconds) of the start of the track |

#### Example: List

```ruby
# list returns an Array of Track records (raises on error).
tracks = client.Track.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── OpenskyNetwork_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`OpenskyNetwork_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
track = client.Track
track.list()

# track.data_get now returns the track data from the last list
# track.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
