# OpenskyNetwork PHP SDK



The PHP SDK for the OpenskyNetwork API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Flight()` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/opensky-network-sdk/releases](https://github.com/voxgig-sdk/opensky-network-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openskynetwork_sdk.php';

$client = new OpenskyNetworkSDK([
    "apikey" => getenv("OPENSKY_NETWORK_APIKEY"),
]);
```

### 2. List flight records

```php
try {
    // list() returns an array of Flight records — iterate directly.
    $flights = $client->Flight()->list();
    foreach ($flights as $item) {
        echo $item["arrivalAirportCandidatesCount"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $tracks = $client->Track()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpenskyNetworkSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$track = $client->Track()->list();
print_r($track);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenskyNetworkSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENSKY_NETWORK_TEST_LIVE=TRUE
OPENSKY_NETWORK_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenskyNetworkSDK

```php
require_once 'openskynetwork_sdk.php';
$client = new OpenskyNetworkSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenskyNetworkSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenskyNetworkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Flight` | `($data): FlightEntity` | Create a Flight entity instance. |
| `StateVector` | `($data): StateVectorEntity` | Create a StateVector entity instance. |
| `Track` | `($data): TrackEntity` | Create a Track entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$flight = $client->Flight();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```php
// list() returns an array of Flight records (throws on error).
$flights = $client->Flight()->list();
```


### StateVector

Create an instance: `$state_vector = $client->StateVector();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `states` | `array` | Array of state vectors |
| `time` | `int` | The time which the state vectors in this response are associated with. |

#### Example: List

```php
// list() returns an array of StateVector records (throws on error).
$state_vectors = $client->StateVector()->list();
```


### Track

Create an instance: `$track = $client->Track();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callsign` | `string` | Callsign of the vehicle |
| `endTime` | `int` | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | Unique ICAO 24-bit address of the transponder |
| `path` | `array` | Array of waypoints representing the aircraft trajectory |
| `startTime` | `int` | Unix timestamp (seconds) of the start of the track |

#### Example: List

```php
// list() returns an array of Track records (throws on error).
$tracks = $client->Track()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openskynetwork_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openskynetwork_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$track = $client->Track();
$track->list();

// $track->data_get() now returns the track data from the last list
// $track->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
