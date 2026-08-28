# OpenskyNetwork Python SDK Reference

Complete API reference for the OpenskyNetwork Python SDK.


## OpenskyNetworkSDK

### Constructor

```python
from openskynetwork_sdk import OpenskyNetworkSDK

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

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## FlightEntity

```python
flight = client.Flight()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrivalAirportCandidatesCount` | `int` | No | Number of candidates for arrival airport |
| `callsign` | `str` | No | Callsign of the vehicle (8 chars) |
| `departureAirportCandidatesCount` | `int` | No | Number of candidates for departure airport |
| `estArrivalAirport` | `str` | No | Estimated arrival airport ICAO code |
| `estArrivalAirportHorizDistance` | `int` | No | Horizontal distance to estimated arrival airport in meters |
| `estArrivalAirportVertDistance` | `int` | No | Vertical distance to estimated arrival airport in meters |
| `estDepartureAirport` | `str` | No | Estimated departure airport ICAO code |
| `estDepartureAirportHorizDistance` | `int` | No | Horizontal distance to estimated departure airport in meters |
| `estDepartureAirportVertDistance` | `int` | No | Vertical distance to estimated departure airport in meters |
| `firstSeen` | `int` | No | Unix timestamp (seconds) of the first position report |
| `icao24` | `str` | No | Unique ICAO 24-bit address of the transponder in hex string representation |
| `lastSeen` | `int` | No | Unix timestamp (seconds) of the last position report |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Flight().list({"begin": 1, "end": 1})
for flight in results:
    print(flight)
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
| `states` | `list` | No | Array of state vectors |
| `time` | `int` | No | The time which the state vectors in this response are associated with. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.StateVector().list()
for state_vector in results:
    print(state_vector)
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
| `callsign` | `str` | No | Callsign of the vehicle |
| `endTime` | `int` | No | Unix timestamp (seconds) of the end of the track |
| `icao24` | `str` | No | Unique ICAO 24-bit address of the transponder |
| `path` | `list` | No | Array of waypoints representing the aircraft trajectory |
| `startTime` | `int` | No | Unix timestamp (seconds) of the start of the track |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Track().list({"icao24": "example", "time": 1})
for track in results:
    print(track)
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

