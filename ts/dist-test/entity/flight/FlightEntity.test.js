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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "arrivalAirportCandidatesCount": { "a": true, "h": "Arrival Airport Candidates Count", "n": "arrivalAirportCandidatesCount", "r": false, "sh": "Number of candidates for arrival airport", "t": "`$INTEGER`", "key$": "arrivalAirportCandidatesCount", "index$": 0 }, "callsign": { "a": true, "h": "Callsign", "n": "callsign", "r": false, "sh": "Callsign of the vehicle (8 chars)", "t": "`$STRING`", "key$": "callsign", "index$": 1 }, "departureAirportCandidatesCount": { "a": true, "h": "Departure Airport Candidates Count", "n": "departureAirportCandidatesCount", "r": false, "sh": "Number of candidates for departure airport", "t": "`$INTEGER`", "key$": "departureAirportCandidatesCount", "index$": 2 }, "estArrivalAirport": { "a": true, "h": "Est Arrival Airport", "n": "estArrivalAirport", "r": false, "sh": "Estimated arrival airport ICAO code", "t": "`$STRING`", "key$": "estArrivalAirport", "index$": 3 }, "estArrivalAirportHorizDistance": { "a": true, "h": "Est Arrival Airport Horiz Distance", "n": "estArrivalAirportHorizDistance", "r": false, "sh": "Horizontal distance to estimated arrival airport in meters", "t": "`$INTEGER`", "key$": "estArrivalAirportHorizDistance", "index$": 4 }, "estArrivalAirportVertDistance": { "a": true, "h": "Est Arrival Airport Vert Distance", "n": "estArrivalAirportVertDistance", "r": false, "sh": "Vertical distance to estimated arrival airport in meters", "t": "`$INTEGER`", "key$": "estArrivalAirportVertDistance", "index$": 5 }, "estDepartureAirport": { "a": true, "h": "Est Departure Airport", "n": "estDepartureAirport", "r": false, "sh": "Estimated departure airport ICAO code", "t": "`$STRING`", "key$": "estDepartureAirport", "index$": 6 }, "estDepartureAirportHorizDistance": { "a": true, "h": "Est Departure Airport Horiz Distance", "n": "estDepartureAirportHorizDistance", "r": false, "sh": "Horizontal distance to estimated departure airport in meters", "t": "`$INTEGER`", "key$": "estDepartureAirportHorizDistance", "index$": 7 }, "estDepartureAirportVertDistance": { "a": true, "h": "Est Departure Airport Vert Distance", "n": "estDepartureAirportVertDistance", "r": false, "sh": "Vertical distance to estimated departure airport in meters", "t": "`$INTEGER`", "key$": "estDepartureAirportVertDistance", "index$": 8 }, "firstSeen": { "a": true, "h": "First Seen", "n": "firstSeen", "r": false, "sh": "Unix timestamp (seconds) of the first position report", "t": "`$INTEGER`", "key$": "firstSeen", "index$": 9 }, "icao24": { "a": true, "h": "Icao24", "n": "icao24", "r": false, "sh": "Unique ICAO 24-bit address of the transponder in hex string representation", "t": "`$STRING`", "key$": "icao24", "index$": 10 }, "lastSeen": { "a": true, "h": "Last Seen", "n": "lastSeen", "r": false, "sh": "Unix timestamp (seconds) of the last position report", "t": "`$INTEGER`", "key$": "lastSeen", "index$": 11 } }, "name": "flight", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /flights/aircraft", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "begin", "or": "begin", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "end", "or": "end", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "icao24", "or": "icao24", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/flights/aircraft", "q": { "$action": "aircraft", "exist": ["begin", "end", "icao24"] }, "r": {}, "s": [{ "lit": "flights" }, { "lit": "aircraft" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /flights/arrival", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "airport", "or": "airport", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "begin", "or": "begin", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "end", "or": "end", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/flights/arrival", "q": { "$action": "arrival", "exist": ["airport", "begin", "end"] }, "r": {}, "s": [{ "lit": "flights" }, { "lit": "arrival" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /flights/departure", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "airport", "or": "airport", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "begin", "or": "begin", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "end", "or": "end", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/flights/departure", "q": { "$action": "departure", "exist": ["airport", "begin", "end"] }, "r": {}, "s": [{ "lit": "flights" }, { "lit": "departure" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /flights/all", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "begin", "or": "begin", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "end", "or": "end", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/flights/all", "q": { "$action": "all", "exist": ["begin", "end"] }, "r": {}, "s": [{ "lit": "flights" }, { "lit": "all" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "flight", "name__orig": "flight", "Name": "Flight", "name_": "flight", "name-": "flight", "NAME": "FLIGHT", "index$": 0 }, { "active": true, "entity": "flight", "key$": "BasicFlightFlow", "kind": "basic", "name": "BasicFlightFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "flight_ref01" } }], "index$": 0 }] }, 'Flight', { "GET /flights/aircraft": { "protocol": "http", "operationId": "getFlightsByAircraft", "responses": { "200": { "description": "Successful response with flights data", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "icao24": { "type": "string", "description": "Unique ICAO 24-bit address of the transponder in hex string representation", "key$": "icao24" }, "firstSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the first position report", "key$": "firstSeen" }, "estDepartureAirport": { "type": "string", "nullable": true, "description": "Estimated departure airport ICAO code", "key$": "estDepartureAirport" }, "lastSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the last position report", "key$": "lastSeen" }, "estArrivalAirport": { "type": "string", "nullable": true, "description": "Estimated arrival airport ICAO code", "key$": "estArrivalAirport" }, "callsign": { "type": "string", "nullable": true, "description": "Callsign of the vehicle (8 chars)", "key$": "callsign" }, "estDepartureAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated departure airport in meters", "key$": "estDepartureAirportHorizDistance" }, "estDepartureAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated departure airport in meters", "key$": "estDepartureAirportVertDistance" }, "estArrivalAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated arrival airport in meters", "key$": "estArrivalAirportHorizDistance" }, "estArrivalAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated arrival airport in meters", "key$": "estArrivalAirportVertDistance" }, "departureAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for departure airport", "key$": "departureAirportCandidatesCount" }, "arrivalAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for arrival airport", "key$": "arrivalAirportCandidatesCount" } }, "x-ref": "#/components/schemas/Flight", "index$": 0 } } } } }, "400": { "description": "Bad Request - Invalid parameters" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "icao24", "in": "query", "description": "ICAO24 transponder address represented by a hex string", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "begin", "in": "query", "description": "Start of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 1 }, { "name": "end", "in": "query", "description": "End of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 2 }], "security": [{}, { "basicAuth": [] }, { "oauth2": [] }], "securitySource": "operation", "securitySchemes": { "basicAuth": { "type": "http", "scheme": "basic", "description": "Basic authentication using OpenSky username and password (deprecated for new accounts)" }, "oauth2": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" } } }, "GET /flights/arrival": { "protocol": "http", "operationId": "getArrivalsByAirport", "responses": { "200": { "description": "Successful response with arrivals data", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "icao24": { "type": "string", "description": "Unique ICAO 24-bit address of the transponder in hex string representation", "key$": "icao24" }, "firstSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the first position report", "key$": "firstSeen" }, "estDepartureAirport": { "type": "string", "nullable": true, "description": "Estimated departure airport ICAO code", "key$": "estDepartureAirport" }, "lastSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the last position report", "key$": "lastSeen" }, "estArrivalAirport": { "type": "string", "nullable": true, "description": "Estimated arrival airport ICAO code", "key$": "estArrivalAirport" }, "callsign": { "type": "string", "nullable": true, "description": "Callsign of the vehicle (8 chars)", "key$": "callsign" }, "estDepartureAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated departure airport in meters", "key$": "estDepartureAirportHorizDistance" }, "estDepartureAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated departure airport in meters", "key$": "estDepartureAirportVertDistance" }, "estArrivalAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated arrival airport in meters", "key$": "estArrivalAirportHorizDistance" }, "estArrivalAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated arrival airport in meters", "key$": "estArrivalAirportVertDistance" }, "departureAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for departure airport", "key$": "departureAirportCandidatesCount" }, "arrivalAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for arrival airport", "key$": "arrivalAirportCandidatesCount" } }, "x-ref": "#/components/schemas/Flight", "index$": 0 } } } } }, "400": { "description": "Bad Request - Invalid parameters" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "airport", "in": "query", "description": "ICAO airport code", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "begin", "in": "query", "description": "Start of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 1 }, { "name": "end", "in": "query", "description": "End of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 2 }], "security": [{}, { "basicAuth": [] }, { "oauth2": [] }], "securitySource": "operation", "securitySchemes": { "basicAuth": { "type": "http", "scheme": "basic", "description": "Basic authentication using OpenSky username and password (deprecated for new accounts)" }, "oauth2": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" } } }, "GET /flights/departure": { "protocol": "http", "operationId": "getDeparturesByAirport", "responses": { "200": { "description": "Successful response with departures data", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "icao24": { "type": "string", "description": "Unique ICAO 24-bit address of the transponder in hex string representation", "key$": "icao24" }, "firstSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the first position report", "key$": "firstSeen" }, "estDepartureAirport": { "type": "string", "nullable": true, "description": "Estimated departure airport ICAO code", "key$": "estDepartureAirport" }, "lastSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the last position report", "key$": "lastSeen" }, "estArrivalAirport": { "type": "string", "nullable": true, "description": "Estimated arrival airport ICAO code", "key$": "estArrivalAirport" }, "callsign": { "type": "string", "nullable": true, "description": "Callsign of the vehicle (8 chars)", "key$": "callsign" }, "estDepartureAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated departure airport in meters", "key$": "estDepartureAirportHorizDistance" }, "estDepartureAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated departure airport in meters", "key$": "estDepartureAirportVertDistance" }, "estArrivalAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated arrival airport in meters", "key$": "estArrivalAirportHorizDistance" }, "estArrivalAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated arrival airport in meters", "key$": "estArrivalAirportVertDistance" }, "departureAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for departure airport", "key$": "departureAirportCandidatesCount" }, "arrivalAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for arrival airport", "key$": "arrivalAirportCandidatesCount" } }, "x-ref": "#/components/schemas/Flight", "index$": 0 } } } } }, "400": { "description": "Bad Request - Invalid parameters" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "airport", "in": "query", "description": "ICAO airport code", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "begin", "in": "query", "description": "Start of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 1 }, { "name": "end", "in": "query", "description": "End of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 2 }], "security": [{}, { "basicAuth": [] }, { "oauth2": [] }], "securitySource": "operation", "securitySchemes": { "basicAuth": { "type": "http", "scheme": "basic", "description": "Basic authentication using OpenSky username and password (deprecated for new accounts)" }, "oauth2": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" } } }, "GET /flights/all": { "protocol": "http", "operationId": "getFlightsInInterval", "responses": { "200": { "description": "Successful response with flights data", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "icao24": { "type": "string", "description": "Unique ICAO 24-bit address of the transponder in hex string representation", "key$": "icao24" }, "firstSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the first position report", "key$": "firstSeen" }, "estDepartureAirport": { "type": "string", "nullable": true, "description": "Estimated departure airport ICAO code", "key$": "estDepartureAirport" }, "lastSeen": { "type": "integer", "description": "Unix timestamp (seconds) of the last position report", "key$": "lastSeen" }, "estArrivalAirport": { "type": "string", "nullable": true, "description": "Estimated arrival airport ICAO code", "key$": "estArrivalAirport" }, "callsign": { "type": "string", "nullable": true, "description": "Callsign of the vehicle (8 chars)", "key$": "callsign" }, "estDepartureAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated departure airport in meters", "key$": "estDepartureAirportHorizDistance" }, "estDepartureAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated departure airport in meters", "key$": "estDepartureAirportVertDistance" }, "estArrivalAirportHorizDistance": { "type": "integer", "nullable": true, "description": "Horizontal distance to estimated arrival airport in meters", "key$": "estArrivalAirportHorizDistance" }, "estArrivalAirportVertDistance": { "type": "integer", "nullable": true, "description": "Vertical distance to estimated arrival airport in meters", "key$": "estArrivalAirportVertDistance" }, "departureAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for departure airport", "key$": "departureAirportCandidatesCount" }, "arrivalAirportCandidatesCount": { "type": "integer", "description": "Number of candidates for arrival airport", "key$": "arrivalAirportCandidatesCount" } }, "x-ref": "#/components/schemas/Flight", "index$": 0 } } } } }, "400": { "description": "Bad Request - Invalid parameters" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "begin", "in": "query", "description": "Start of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 0 }, { "name": "end", "in": "query", "description": "End of time interval in seconds since epoch (Unix timestamp)", "required": true, "schema": { "type": "integer" }, "index$": 1 }], "security": [{}, { "basicAuth": [] }, { "oauth2": [] }], "securitySource": "operation", "securitySchemes": { "basicAuth": { "type": "http", "scheme": "basic", "description": "Basic authentication using OpenSky username and password (deprecated for new accounts)" }, "oauth2": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" } } } });
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