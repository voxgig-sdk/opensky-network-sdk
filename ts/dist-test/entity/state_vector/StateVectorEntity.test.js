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
(0, node_test_1.describe)('StateVectorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENSKY_NETWORK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenskyNetworkSDK.test();
        const ent = testsdk.StateVector();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'state_vector.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "states", "req": false, "short": "Array of state vectors", "type": "`$ARRAY`", "union": { "branches": 5, "count": 1, "depth": 2 }, "index$": 0 }, { "active": true, "name": "time", "req": false, "short": "The time which the state vectors in this response are associated with.", "type": "`$INTEGER`", "index$": 1 }], "name": "state_vector", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "extended", "orig": "extended", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "icao24", "orig": "icao24", "reqd": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "kind": "query", "name": "lamax", "orig": "lamax", "reqd": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "kind": "query", "name": "lamin", "orig": "lamin", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "kind": "query", "name": "lomax", "orig": "lomax", "reqd": false, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "kind": "query", "name": "lomin", "orig": "lomin", "reqd": false, "type": "`$NUMBER`", "index$": 5 }, { "active": true, "kind": "query", "name": "time", "orig": "time", "reqd": false, "type": "`$INTEGER`", "index$": 6 }] }, "contract": { "id": "GET /states/all", "json": "{\"operationId\":\"getAllStates\",\"parameters\":[{\"description\":\"The time in seconds since epoch (Unix timestamp) to retrieve states for. Current time will be used if omitted.\",\"in\":\"query\",\"name\":\"time\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"One or more ICAO24 transponder addresses represented by a hex string (e.g. abc9f3). To filter multiple ICAO24 append the property once for each address. If omitted, the state vectors of all aircraft are returned.\",\"explode\":true,\"in\":\"query\",\"name\":\"icao24\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Lower bound for the latitude in decimal degrees\",\"in\":\"query\",\"name\":\"lamin\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Lower bound for the longitude in decimal degrees\",\"in\":\"query\",\"name\":\"lomin\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Upper bound for the latitude in decimal degrees\",\"in\":\"query\",\"name\":\"lamax\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Upper bound for the longitude in decimal degrees\",\"in\":\"query\",\"name\":\"lomax\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Set to 1 to include aircraft category information\",\"in\":\"query\",\"name\":\"extended\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"states\":{\"description\":\"Array of state vectors\",\"items\":{\"description\":\"State vector representing an aircraft's state\",\"example\":[\"abc9f3\",\"CALLSIGN\",\"United States\",1458564121,1458564121,-100.5,40.5,1500,false,150,90,5,[1,2,3],1520,\"1234\",false,0,3],\"items\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"number\"},{\"type\":\"integer\"},{\"type\":\"boolean\"},{\"type\":\"array\"},{\"type\":\"null\"}]},\"maxItems\":18,\"minItems\":17,\"type\":\"array\"},\"type\":\"array\"},\"time\":{\"description\":\"The time which the state vectors in this response are associated with. All vectors represent the state of a vehicle with the interval [time - 1, time].\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with state vectors\",\"headers\":{\"X-Rate-Limit-Remaining\":{\"description\":\"Number of remaining API credits\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\",\"headers\":{\"X-Rate-Limit-Retry-After-Seconds\":{\"description\":\"Number of seconds until credits become available again\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/states/all", "segments": [{ "lit": "states" }, { "lit": "all" }], "select": { "exist": ["extended", "icao24", "lamax", "lamin", "lomax", "lomin", "time"] }, "transform": { "req": "`reqdata`", "res": "`body.states`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "icao24", "orig": "icao24", "reqd": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "kind": "query", "name": "serial", "orig": "serial", "reqd": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "kind": "query", "name": "time", "orig": "time", "reqd": false, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /states/own", "json": "{\"operationId\":\"getOwnStates\",\"parameters\":[{\"description\":\"The time in seconds since epoch (Unix timestamp) to retrieve states for. Current time will be used if omitted.\",\"in\":\"query\",\"name\":\"time\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"One or more ICAO24 transponder addresses represented by a hex string (e.g. abc9f3). To filter multiple ICAO24 append the property once for each address. If omitted, the state vectors of all aircraft are returned.\",\"explode\":true,\"in\":\"query\",\"name\":\"icao24\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Retrieve only states of a subset of your receivers. You can pass this argument several times to filter state of more than one of your receivers.\",\"explode\":true,\"in\":\"query\",\"name\":\"serials\",\"required\":false,\"schema\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"states\":{\"description\":\"Array of state vectors\",\"items\":{\"description\":\"State vector representing an aircraft's state\",\"example\":[\"abc9f3\",\"CALLSIGN\",\"United States\",1458564121,1458564121,-100.5,40.5,1500,false,150,90,5,[1,2,3],1520,\"1234\",false,0,3],\"items\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"number\"},{\"type\":\"integer\"},{\"type\":\"boolean\"},{\"type\":\"array\"},{\"type\":\"null\"}]},\"maxItems\":18,\"minItems\":17,\"type\":\"array\"},\"type\":\"array\"},\"time\":{\"description\":\"The time which the state vectors in this response are associated with. All vectors represent the state of a vehicle with the interval [time - 1, time].\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with state vectors\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing authentication\"},\"403\":{\"description\":\"Forbidden - Authentication required\"}},\"security\":[{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/states/own", "segments": [{ "lit": "states" }, { "lit": "own" }], "select": { "exist": ["icao24", "serial", "time"] }, "transform": { "req": "`reqdata`", "res": "`body.states`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "state_vector", "name__orig": "state_vector", "Name": "StateVector", "name_": "state_vector", "name-": "state-vector", "NAME": "STATE_VECTOR", "index$": 1 }, { "active": true, "entity": "state_vector", "key$": "BasicStateVectorFlow", "kind": "basic", "name": "BasicStateVectorFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "state_vector_ref01" } }], "index$": 0 }] }, 'StateVector');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let state_vector_ref01_data = Object.values(setup.data.existing.state_vector)[0];
        // LIST
        const state_vector_ref01_ent = client.StateVector();
        const state_vector_ref01_match = {};
        const state_vector_ref01_list = (await state_vector_ref01_ent.list(state_vector_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/state_vector/StateVectorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenskyNetworkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['state_vector01', 'state_vector02', 'state_vector03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID': idmap,
        'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
        'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
        'OPENSKY_NETWORK_APIKEY': '',
        'OPENSKY_NETWORK_SECRET': '',
    });
    idmap = env['OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID'];
    const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID'];
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
//# sourceMappingURL=StateVectorEntity.test.js.map