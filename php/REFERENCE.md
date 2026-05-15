# OpenskyNetwork PHP SDK Reference

Complete API reference for the OpenskyNetwork PHP SDK.


## OpenskyNetworkSDK

### Constructor

```php
require_once __DIR__ . '/opensky-network_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## FlightEntity

```php
$flight = $client->Flight();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Flight()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FlightEntity`

Create a new `FlightEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StateVectorEntity

```php
$state_vector = $client->StateVector();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | ``$ARRAY`` | No |  |
| `time` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->StateVector()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StateVectorEntity`

Create a new `StateVectorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TrackEntity

```php
$track = $client->Track();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Track()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TrackEntity`

Create a new `TrackEntity` instance with the same client and
options.

#### `getName(): string`

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

