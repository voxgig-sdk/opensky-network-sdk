# OpenskyNetwork SDK

Crowdsourced ADS-B aircraft state vectors, flights, and tracks from a global sensor network

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About OpenSky Network API

The [OpenSky Network](https://opensky-network.org/) is a non-profit, community-driven receiver network that collects ADS-B and Mode S aviation surveillance data from thousands of volunteer sensors worldwide. Its REST API at `https://opensky-network.org/api` exposes that live and historical aircraft data for researchers, hobbyists, and tooling.

What you get from the API:

- Real-time **state vectors** for aircraft globally (`/states/all`) or only those visible to your own sensors (`/states/own`), including ICAO24 address, callsign, origin country, position, altitudes, velocity, heading, vertical rate, squawk and category
- Historical **flights** within a time window (`/flights/all`), by aircraft (`/flights/aircraft`), or by airport arrivals/departures (`/flights/arrival`, `/flights/departure`)
- Aircraft **tracks** as ordered waypoints (`/tracks` — experimental)

Access uses OAuth2 client credentials: users obtain a `client_id` and `client_secret` from their OpenSky account and exchange them for a Bearer token (valid ~30 minutes). Requests are metered with a daily credit-based system across separate state, track, and flight buckets, with higher allowances for registered users, active feeders, and licensed users. Query cost depends on the bounding box size, with global queries costing more credits than narrow regional ones.

## Try it

**TypeScript**
```bash
npm install opensky-network
```

**Python**
```bash
pip install opensky-network-sdk
```

**PHP**
```bash
composer require voxgig/opensky-network-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/opensky-network-sdk/go
```

**Ruby**
```bash
gem install opensky-network-sdk
```

**Lua**
```bash
luarocks install opensky-network-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenskyNetworkSDK } from 'opensky-network'

const client = new OpenskyNetworkSDK({})

// List all flights
const flights = await client.Flight().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o opensky-network-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "opensky-network": {
      "command": "/abs/path/to/opensky-network-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Flight** | Historical flight records for an aircraft or airport, served via `/flights/all`, `/flights/aircraft`, `/flights/arrival`, and `/flights/departure` | `/flights/aircraft` |
| **StateVector** | Live position and motion snapshot of an aircraft (ICAO24, callsign, coordinates, altitude, velocity, heading, vertical rate, squawk, category), served via `/states/all` and `/states/own` | `/states/all` |
| **Track** | Ordered sequence of waypoints describing an aircraft's trajectory, served via `/tracks` (experimental) | `/tracks` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openskynetwork_sdk import OpenskyNetworkSDK

client = OpenskyNetworkSDK({})

# List all flights
flights, err = client.Flight(None).list(None, None)
```

### PHP

```php
<?php
require_once 'openskynetwork_sdk.php';

$client = new OpenskyNetworkSDK([]);

// List all flights
[$flights, $err] = $client->Flight(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/opensky-network-sdk/go"

client := sdk.NewOpenskyNetworkSDK(map[string]any{})

// List all flights
flights, err := client.Flight(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OpenskyNetwork_sdk"

client = OpenskyNetworkSDK.new({})

# List all flights
flights, err = client.Flight(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("opensky-network_sdk")

local client = sdk.new({})

-- List all flights
local flights, err = client:Flight(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenskyNetworkSDK.test()
const result = await client.Flight().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenskyNetworkSDK.test(None, None)
result, err = client.Flight(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenskyNetworkSDK::test(null, null);
[$result, $err] = $client->Flight(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Flight(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenskyNetworkSDK.test(nil, nil)
result, err = client.Flight(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Flight(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the OpenSky Network API

- Upstream: [https://opensky-network.org/](https://opensky-network.org/)
- API docs: [https://openskynetwork.github.io/opensky-api/rest.html](https://openskynetwork.github.io/opensky-api/rest.html)

- Operated by the [OpenSky Network](https://opensky-network.org/) research association
- Data is intended for non-commercial and academic use; commercial use requires a separate licence
- Attribution to the OpenSky Network is expected when using or republishing data
- See the [REST API documentation](https://openskynetwork.github.io/opensky-api/rest.html) for current terms

---

Generated from the OpenSky Network API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
