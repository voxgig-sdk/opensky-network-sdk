# OpenskyNetwork PHP SDK Reference

Complete API reference for the OpenskyNetwork PHP SDK.


## OpenskyNetworkSDK

### Constructor

```php
require_once __DIR__ . '/openskynetwork_sdk.php';

$client = new OpenskyNetworkSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenskyNetworkSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenskyNetworkSDK::test();
```


### Instance Methods

#### `Flight($data = null)`

Create a new `FlightEntity` instance. Pass `null` for no initial data.

#### `StateVector($data = null)`

Create a new `StateVectorEntity` instance. Pass `null` for no initial data.

#### `Track($data = null)`

Create a new `TrackEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OpenskyNetworkUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## FlightEntity

```php
$flight = $client->Flight();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Flight()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FlightEntity`

Create a new `FlightEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StateVectorEntity

```php
$state_vector = $client->StateVector();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `states` | `array` | No | Array of state vectors |
| `time` | `int` | No | The time which the state vectors in this response are associated with. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->StateVector()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StateVectorEntity`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrackEntity

```php
$track = $client->Track();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callsign` | `string` | No | Callsign of the vehicle |
| `endTime` | `int` | No | Unix timestamp (seconds) of the end of the track |
| `icao24` | `string` | No | Unique ICAO 24-bit address of the transponder |
| `path` | `array` | No | Array of waypoints representing the aircraft trajectory |
| `startTime` | `int` | No | Unix timestamp (seconds) of the start of the track |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Track()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrackEntity`

Create a new `TrackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OpenskyNetworkSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

