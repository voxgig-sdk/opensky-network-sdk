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
(0, node_test_1.describe)('TrackEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENSKY_NETWORK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenskyNetworkSDK.test();
        const ent = testsdk.Track();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'track.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "callsign": { "a": true, "h": "Callsign", "n": "callsign", "r": false, "sh": "Callsign of the vehicle", "t": "`$STRING`", "key$": "callsign", "index$": 0 }, "endTime": { "a": true, "h": "End Time", "n": "endTime", "r": false, "sh": "Unix timestamp (seconds) of the end of the track", "t": "`$INTEGER`", "key$": "endTime", "index$": 1 }, "icao24": { "a": true, "h": "Icao24", "n": "icao24", "r": false, "sh": "Unique ICAO 24-bit address of the transponder", "t": "`$STRING`", "key$": "icao24", "index$": 2 }, "path": { "a": true, "h": "Path", "n": "path", "r": false, "sh": "Array of waypoints representing the aircraft trajectory", "t": "`$ARRAY`", "union": { "branches": 3, "count": 1, "depth": 2 }, "key$": "path", "index$": 3 }, "startTime": { "a": true, "h": "Start Time", "n": "startTime", "r": false, "sh": "Unix timestamp (seconds) of the start of the track", "t": "`$INTEGER`", "key$": "startTime", "index$": 4 } }, "name": "track", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /tracks", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "icao24", "or": "icao24", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "time", "or": "time", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/tracks", "q": { "exist": ["icao24", "time"] }, "r": {}, "s": [{ "lit": "tracks" }], "t": { "req": "`reqdata`", "res": "`body.path`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "track", "name__orig": "track", "Name": "Track", "name_": "track", "name-": "track", "NAME": "TRACK", "index$": 3 }, { "active": true, "entity": "track", "key$": "BasicTrackFlow", "kind": "basic", "name": "BasicTrackFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "track_ref01" } }], "index$": 0 }] }, 'Track', { "GET /tracks": { "protocol": "http", "operationId": "getTrackByAircraft", "responses": { "200": { "description": "Successful response with track data", "content": { "application/json": { "schema": { "type": "object", "properties": { "icao24": { "description": "Unique ICAO 24-bit address of the transponder", "key$": "icao24", "type": "string" }, "startTime": { "description": "Unix timestamp (seconds) of the start of the track", "key$": "startTime", "type": "integer" }, "endTime": { "description": "Unix timestamp (seconds) of the end of the track", "key$": "endTime", "type": "integer" }, "callsign": { "description": "Callsign of the vehicle", "key$": "callsign", "nullable": true, "type": "string" }, "path": { "description": "Array of waypoints representing the aircraft trajectory", "items": { "description": "Waypoint [time, latitude, longitude, altitude, on_ground]", "items": { "oneOf": [{ "type": "number" }, { "type": "integer" }, { "type": "boolean" }, { "type": "null" }] }, "maxItems": 5, "minItems": 5, "type": "array" }, "key$": "path", "type": "array" } }, "x-ref": "#/components/schemas/Track", "index$": 0 } } } }, "400": { "description": "Bad Request - Invalid parameters" }, "404": { "description": "Not Found - No track found for the given aircraft and time" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "icao24", "in": "query", "description": "ICAO24 transponder address represented by a hex string", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "time", "in": "query", "description": "Unix timestamp (seconds) for which the track should be retrieved", "required": true, "schema": { "type": "integer" }, "index$": 1 }], "security": [{}, { "basicAuth": [] }, { "oauth2": [] }], "securitySource": "operation", "securitySchemes": { "basicAuth": { "type": "http", "scheme": "basic", "description": "Basic authentication using OpenSky username and password (deprecated for new accounts)" }, "oauth2": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let track_ref01_data = Object.values(setup.data.existing.track)[0];
        // LIST
        const track_ref01_ent = client.Track();
        const track_ref01_match = {};
        const track_ref01_list = (await track_ref01_ent.list(track_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/track/TrackTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenskyNetworkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['track01', 'track02', 'track03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENSKY_NETWORK_TEST_TRACK_ENTID': idmap,
        'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
        'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
        'OPENSKY_NETWORK_APIKEY': '',
        'OPENSKY_NETWORK_SECRET': '',
    });
    idmap = env['OPENSKY_NETWORK_TEST_TRACK_ENTID'];
    const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENSKY_NETWORK_TEST_TRACK_ENTID'];
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
//# sourceMappingURL=TrackEntity.test.js.map