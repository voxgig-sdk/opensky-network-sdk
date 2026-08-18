package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenskyNetwork",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://opensky-network.org/api",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"flight": map[string]any{},
				"state_vector": map[string]any{},
				"track": map[string]any{},
			},
		},
		"entity": map[string]any{
			"flight": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arrivalAirportCandidatesCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "callsign",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departureAirportCandidatesCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estArrivalAirport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estArrivalAirportHorizDistance",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estArrivalAirportVertDistance",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estDepartureAirport",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estDepartureAirportHorizDistance",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estDepartureAirportVertDistance",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "firstSeen",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "icao24",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastSeen",
						"type": "`$INTEGER`",
					},
				},
				"name": "flight",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/flights/aircraft",
								"parts": []any{
									"flights",
									"aircraft",
								},
								"select": map[string]any{
									"$action": "aircraft",
									"exist": []any{
										"begin",
										"end",
										"icao24",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "airport",
											"orig": "airport",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/flights/arrival",
								"parts": []any{
									"flights",
									"arrival",
								},
								"select": map[string]any{
									"$action": "arrival",
									"exist": []any{
										"airport",
										"begin",
										"end",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "airport",
											"orig": "airport",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/flights/departure",
								"parts": []any{
									"flights",
									"departure",
								},
								"select": map[string]any{
									"$action": "departure",
									"exist": []any{
										"airport",
										"begin",
										"end",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/flights/all",
								"parts": []any{
									"flights",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"begin",
										"end",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"state_vector": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "states",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 5,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "time",
						"type": "`$INTEGER`",
					},
				},
				"name": "state_vector",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "extended",
											"orig": "extended",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "lamax",
											"orig": "lamax",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lamin",
											"orig": "lamin",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lomax",
											"orig": "lomax",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lomin",
											"orig": "lomin",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/states/all",
								"parts": []any{
									"states",
									"all",
								},
								"select": map[string]any{
									"exist": []any{
										"extended",
										"icao24",
										"lamax",
										"lamin",
										"lomax",
										"lomin",
										"time",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "serial",
											"orig": "serial",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/states/own",
								"parts": []any{
									"states",
									"own",
								},
								"select": map[string]any{
									"exist": []any{
										"icao24",
										"serial",
										"time",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"track": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "callsign",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "endTime",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "icao24",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "path",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "startTime",
						"type": "`$INTEGER`",
					},
				},
				"name": "track",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tracks",
								"parts": []any{
									"tracks",
								},
								"select": map[string]any{
									"exist": []any{
										"icao24",
										"time",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.path`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
