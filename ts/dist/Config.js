"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'OpenskyNetwork',
        slug: "opensky-network",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://opensky-network.org/api",
        auth: {
            prefix: 'Basic',
            basic: true,
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            flight: {},
            state_vector: {},
            track: {},
        }
    };
    entity = {
        "flight": {
            "fields": [
                {
                    "name": "arrivalAirportCandidatesCount",
                    "short": "Number of candidates for arrival airport",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "callsign",
                    "short": "Callsign of the vehicle (8 chars)",
                    "type": "`$STRING`"
                },
                {
                    "name": "departureAirportCandidatesCount",
                    "short": "Number of candidates for departure airport",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "estArrivalAirport",
                    "short": "Estimated arrival airport ICAO code",
                    "type": "`$STRING`"
                },
                {
                    "name": "estArrivalAirportHorizDistance",
                    "short": "Horizontal distance to estimated arrival airport in meters",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "estArrivalAirportVertDistance",
                    "short": "Vertical distance to estimated arrival airport in meters",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "estDepartureAirport",
                    "short": "Estimated departure airport ICAO code",
                    "type": "`$STRING`"
                },
                {
                    "name": "estDepartureAirportHorizDistance",
                    "short": "Horizontal distance to estimated departure airport in meters",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "estDepartureAirportVertDistance",
                    "short": "Vertical distance to estimated departure airport in meters",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "firstSeen",
                    "short": "Unix timestamp (seconds) of the first position report",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "icao24",
                    "short": "Unique ICAO 24-bit address of the transponder in hex string representation",
                    "type": "`$STRING`"
                },
                {
                    "name": "lastSeen",
                    "short": "Unix timestamp (seconds) of the last position report",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "flight",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "begin",
                                        "orig": "begin",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "icao24",
                                        "orig": "icao24",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/flights/aircraft",
                            "segments": [
                                {
                                    "lit": "flights"
                                },
                                {
                                    "lit": "aircraft"
                                }
                            ],
                            "select": {
                                "$action": "aircraft",
                                "exist": [
                                    "begin",
                                    "end",
                                    "icao24"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "flights",
                                "aircraft"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "airport",
                                        "orig": "airport",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "begin",
                                        "orig": "begin",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/flights/arrival",
                            "segments": [
                                {
                                    "lit": "flights"
                                },
                                {
                                    "lit": "arrival"
                                }
                            ],
                            "select": {
                                "$action": "arrival",
                                "exist": [
                                    "airport",
                                    "begin",
                                    "end"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "flights",
                                "arrival"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "airport",
                                        "orig": "airport",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "begin",
                                        "orig": "begin",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/flights/departure",
                            "segments": [
                                {
                                    "lit": "flights"
                                },
                                {
                                    "lit": "departure"
                                }
                            ],
                            "select": {
                                "$action": "departure",
                                "exist": [
                                    "airport",
                                    "begin",
                                    "end"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "flights",
                                "departure"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "begin",
                                        "orig": "begin",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/flights/all",
                            "segments": [
                                {
                                    "lit": "flights"
                                },
                                {
                                    "lit": "all"
                                }
                            ],
                            "select": {
                                "$action": "all",
                                "exist": [
                                    "begin",
                                    "end"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "flights",
                                "all"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "state_vector": {
            "fields": [
                {
                    "name": "states",
                    "short": "Array of state vectors",
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 5,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "time",
                    "short": "The time which the state vectors in this response are associated with.",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "state_vector",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "extended",
                                        "orig": "extended",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "icao24",
                                        "orig": "icao24",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lamax",
                                        "orig": "lamax",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lamin",
                                        "orig": "lamin",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lomax",
                                        "orig": "lomax",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "lomin",
                                        "orig": "lomin",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time",
                                        "orig": "time",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/states/all",
                            "segments": [
                                {
                                    "lit": "states"
                                },
                                {
                                    "lit": "all"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "extended",
                                    "icao24",
                                    "lamax",
                                    "lamin",
                                    "lomax",
                                    "lomin",
                                    "time"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.states`"
                            },
                            "parts": [
                                "states",
                                "all"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "icao24",
                                        "orig": "icao24",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "serial",
                                        "orig": "serial",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time",
                                        "orig": "time",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/states/own",
                            "segments": [
                                {
                                    "lit": "states"
                                },
                                {
                                    "lit": "own"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "icao24",
                                    "serial",
                                    "time"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.states`"
                            },
                            "parts": [
                                "states",
                                "own"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "track": {
            "fields": [
                {
                    "name": "callsign",
                    "short": "Callsign of the vehicle",
                    "type": "`$STRING`"
                },
                {
                    "name": "endTime",
                    "short": "Unix timestamp (seconds) of the end of the track",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "icao24",
                    "short": "Unique ICAO 24-bit address of the transponder",
                    "type": "`$STRING`"
                },
                {
                    "name": "path",
                    "short": "Array of waypoints representing the aircraft trajectory",
                    "type": "`$ARRAY`",
                    "union": {
                        "branches": 3,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "startTime",
                    "short": "Unix timestamp (seconds) of the start of the track",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "track",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "icao24",
                                        "orig": "icao24",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "time",
                                        "orig": "time",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tracks",
                            "segments": [
                                {
                                    "lit": "tracks"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "icao24",
                                    "time"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.path`"
                            },
                            "parts": [
                                "tracks"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map