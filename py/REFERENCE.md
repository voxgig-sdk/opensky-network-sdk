# OpenskyNetwork Python SDK Reference

Complete API reference for the OpenskyNetwork Python SDK.


## OpenskyNetworkSDK

### Constructor

```python
from opensky-network_sdk import OpenskyNetworkSDK

client = OpenskyNetworkSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenskyNetworkSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenskyNetworkSDK.test()
```


### Instance Methods

#### `Flight(data=None)`

Create a new `FlightEntity` instance. Pass `None` for no initial data.

#### `StateVector(data=None)`

Create a new `StateVectorEntity` instance. Pass `None` for no initial data.

#### `Track(data=None)`

Create a new `TrackEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## FlightEntity

```python
flight = client.Flight()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Flight().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlightEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StateVectorEntity

```python
state_vector = client.StateVector()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | ``$ARRAY`` | No |  |
| `time` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.StateVector().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateVectorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrackEntity

```python
track = client.Track()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Track().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpenskyNetworkSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

