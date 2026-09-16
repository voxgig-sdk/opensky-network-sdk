"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FlightEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENSKY_NETWORK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenskyNetworkSDK.test();
        const ent = testsdk.Flight();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'flight.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "arrivalAirportCandidatesCount", "req": false, "short": "Number of candidates for arrival airport", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "callsign", "req": false, "short": "Callsign of the vehicle (8 chars)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "departureAirportCandidatesCount", "req": false, "short": "Number of candidates for departure airport", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "estArrivalAirport", "req": false, "short": "Estimated arrival airport ICAO code", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "estArrivalAirportHorizDistance", "req": false, "short": "Horizontal distance to estimated arrival airport in meters", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "estArrivalAirportVertDistance", "req": false, "short": "Vertical distance to estimated arrival airport in meters", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "estDepartureAirport", "req": false, "short": "Estimated departure airport ICAO code", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "estDepartureAirportHorizDistance", "req": false, "short": "Horizontal distance to estimated departure airport in meters", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "estDepartureAirportVertDistance", "req": false, "short": "Vertical distance to estimated departure airport in meters", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "firstSeen", "req": false, "short": "Unix timestamp (seconds) of the first position report", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "icao24", "req": false, "short": "Unique ICAO 24-bit address of the transponder in hex string representation", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "lastSeen", "req": false, "short": "Unix timestamp (seconds) of the last position report", "type": "`$INTEGER`", "index$": 11 }], "name": "flight", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "begin", "orig": "begin", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "end", "orig": "end", "reqd": true, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "icao24", "orig": "icao24", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /flights/aircraft", "json": "{\"operationId\":\"getFlightsByAircraft\",\"parameters\":[{\"description\":\"ICAO24 transponder address represented by a hex string\",\"in\":\"query\",\"name\":\"icao24\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"begin\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"End of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"end\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"arrivalAirportCandidatesCount\":{\"description\":\"Number of candidates for arrival airport\",\"type\":\"integer\"},\"callsign\":{\"description\":\"Callsign of the vehicle (8 chars)\",\"nullable\":true,\"type\":\"string\"},\"departureAirportCandidatesCount\":{\"description\":\"Number of candidates for departure airport\",\"type\":\"integer\"},\"estArrivalAirport\":{\"description\":\"Estimated arrival airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estArrivalAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estArrivalAirportVertDistance\":{\"description\":\"Vertical distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirport\":{\"description\":\"Estimated departure airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estDepartureAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirportVertDistance\":{\"description\":\"Vertical distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"firstSeen\":{\"description\":\"Unix timestamp (seconds) of the first position report\",\"type\":\"integer\"},\"icao24\":{\"description\":\"Unique ICAO 24-bit address of the transponder in hex string representation\",\"type\":\"string\"},\"lastSeen\":{\"description\":\"Unix timestamp (seconds) of the last position report\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with flights data\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/flights/aircraft", "segments": [{ "lit": "flights" }, { "lit": "aircraft" }], "select": { "$action": "aircraft", "exist": ["begin", "end", "icao24"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "airport", "orig": "airport", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "begin", "orig": "begin", "reqd": true, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "end", "orig": "end", "reqd": true, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /flights/arrival", "json": "{\"operationId\":\"getArrivalsByAirport\",\"parameters\":[{\"description\":\"ICAO airport code\",\"in\":\"query\",\"name\":\"airport\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"begin\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"End of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"end\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"arrivalAirportCandidatesCount\":{\"description\":\"Number of candidates for arrival airport\",\"type\":\"integer\"},\"callsign\":{\"description\":\"Callsign of the vehicle (8 chars)\",\"nullable\":true,\"type\":\"string\"},\"departureAirportCandidatesCount\":{\"description\":\"Number of candidates for departure airport\",\"type\":\"integer\"},\"estArrivalAirport\":{\"description\":\"Estimated arrival airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estArrivalAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estArrivalAirportVertDistance\":{\"description\":\"Vertical distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirport\":{\"description\":\"Estimated departure airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estDepartureAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirportVertDistance\":{\"description\":\"Vertical distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"firstSeen\":{\"description\":\"Unix timestamp (seconds) of the first position report\",\"type\":\"integer\"},\"icao24\":{\"description\":\"Unique ICAO 24-bit address of the transponder in hex string representation\",\"type\":\"string\"},\"lastSeen\":{\"description\":\"Unix timestamp (seconds) of the last position report\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with arrivals data\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/flights/arrival", "segments": [{ "lit": "flights" }, { "lit": "arrival" }], "select": { "$action": "arrival", "exist": ["airport", "begin", "end"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "airport", "orig": "airport", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "begin", "orig": "begin", "reqd": true, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "end", "orig": "end", "reqd": true, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /flights/departure", "json": "{\"operationId\":\"getDeparturesByAirport\",\"parameters\":[{\"description\":\"ICAO airport code\",\"in\":\"query\",\"name\":\"airport\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"begin\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"End of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"end\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"arrivalAirportCandidatesCount\":{\"description\":\"Number of candidates for arrival airport\",\"type\":\"integer\"},\"callsign\":{\"description\":\"Callsign of the vehicle (8 chars)\",\"nullable\":true,\"type\":\"string\"},\"departureAirportCandidatesCount\":{\"description\":\"Number of candidates for departure airport\",\"type\":\"integer\"},\"estArrivalAirport\":{\"description\":\"Estimated arrival airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estArrivalAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estArrivalAirportVertDistance\":{\"description\":\"Vertical distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirport\":{\"description\":\"Estimated departure airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estDepartureAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirportVertDistance\":{\"description\":\"Vertical distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"firstSeen\":{\"description\":\"Unix timestamp (seconds) of the first position report\",\"type\":\"integer\"},\"icao24\":{\"description\":\"Unique ICAO 24-bit address of the transponder in hex string representation\",\"type\":\"string\"},\"lastSeen\":{\"description\":\"Unix timestamp (seconds) of the last position report\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with departures data\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/flights/departure", "segments": [{ "lit": "flights" }, { "lit": "departure" }], "select": { "$action": "departure", "exist": ["airport", "begin", "end"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "begin", "orig": "begin", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "end", "orig": "end", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /flights/all", "json": "{\"operationId\":\"getFlightsInInterval\",\"parameters\":[{\"description\":\"Start of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"begin\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"End of time interval in seconds since epoch (Unix timestamp)\",\"in\":\"query\",\"name\":\"end\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"arrivalAirportCandidatesCount\":{\"description\":\"Number of candidates for arrival airport\",\"type\":\"integer\"},\"callsign\":{\"description\":\"Callsign of the vehicle (8 chars)\",\"nullable\":true,\"type\":\"string\"},\"departureAirportCandidatesCount\":{\"description\":\"Number of candidates for departure airport\",\"type\":\"integer\"},\"estArrivalAirport\":{\"description\":\"Estimated arrival airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estArrivalAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estArrivalAirportVertDistance\":{\"description\":\"Vertical distance to estimated arrival airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirport\":{\"description\":\"Estimated departure airport ICAO code\",\"nullable\":true,\"type\":\"string\"},\"estDepartureAirportHorizDistance\":{\"description\":\"Horizontal distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"estDepartureAirportVertDistance\":{\"description\":\"Vertical distance to estimated departure airport in meters\",\"nullable\":true,\"type\":\"integer\"},\"firstSeen\":{\"description\":\"Unix timestamp (seconds) of the first position report\",\"type\":\"integer\"},\"icao24\":{\"description\":\"Unique ICAO 24-bit address of the transponder in hex string representation\",\"type\":\"string\"},\"lastSeen\":{\"description\":\"Unix timestamp (seconds) of the last position report\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with flights data\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/flights/all", "segments": [{ "lit": "flights" }, { "lit": "all" }], "select": { "$action": "all", "exist": ["begin", "end"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "flight", "name__orig": "flight", "Name": "Flight", "name_": "flight", "name-": "flight", "NAME": "FLIGHT", "index$": 0 }, { "active": true, "entity": "flight", "key$": "BasicFlightFlow", "kind": "basic", "name": "BasicFlightFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "flight_ref01" } }], "index$": 0 }] }, 'Flight');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let flight_ref01_data = Object.values(setup.data.existing.flight)[0];
        // LIST
        const flight_ref01_ent = client.Flight();
        const flight_ref01_match = {};
        const flight_ref01_list = (await flight_ref01_ent.list(flight_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/flight/FlightTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenskyNetworkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['flight01', 'flight02', 'flight03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENSKY_NETWORK_TEST_FLIGHT_ENTID': idmap,
        'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
        'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
        'OPENSKY_NETWORK_APIKEY': '',
        'OPENSKY_NETWORK_SECRET': '',
    });
    idmap = env['OPENSKY_NETWORK_TEST_FLIGHT_ENTID'];
    const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENSKY_NETWORK_TEST_FLIGHT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenskyNetworkSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPENSKY_NETWORK_APIKEY,
                secret: env.OPENSKY_NETWORK_SECRET,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPENSKY_NETWORK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FlightEntity.test.js.map