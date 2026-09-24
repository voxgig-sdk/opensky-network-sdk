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
			"slug": "opensky-network",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"own": map[string]any{},
				"state_vector": map[string]any{},
				"track": map[string]any{},
			},
		},
		"entity": map[string]any{
			"flight": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arrivalAirportCandidatesCount",
						"title": "Arrival Airport Candidates Count",
						"type": "`$INTEGER`",
						"short": "Number of candidates for arrival airport",
					},
					map[string]any{
						"name": "callsign",
						"title": "Callsign",
						"type": "`$STRING`",
						"short": "Callsign of the vehicle (8 chars)",
					},
					map[string]any{
						"name": "departureAirportCandidatesCount",
						"title": "Departure Airport Candidates Count",
						"type": "`$INTEGER`",
						"short": "Number of candidates for departure airport",
					},
					map[string]any{
						"name": "estArrivalAirport",
						"title": "Est Arrival Airport",
						"type": "`$STRING`",
						"short": "Estimated arrival airport ICAO code",
					},
					map[string]any{
						"name": "estArrivalAirportHorizDistance",
						"title": "Est Arrival Airport Horiz Distance",
						"type": "`$INTEGER`",
						"short": "Horizontal distance to estimated arrival airport in meters",
					},
					map[string]any{
						"name": "estArrivalAirportVertDistance",
						"title": "Est Arrival Airport Vert Distance",
						"type": "`$INTEGER`",
						"short": "Vertical distance to estimated arrival airport in meters",
					},
					map[string]any{
						"name": "estDepartureAirport",
						"title": "Est Departure Airport",
						"type": "`$STRING`",
						"short": "Estimated departure airport ICAO code",
					},
					map[string]any{
						"name": "estDepartureAirportHorizDistance",
						"title": "Est Departure Airport Horiz Distance",
						"type": "`$INTEGER`",
						"short": "Horizontal distance to estimated departure airport in meters",
					},
					map[string]any{
						"name": "estDepartureAirportVertDistance",
						"title": "Est Departure Airport Vert Distance",
						"type": "`$INTEGER`",
						"short": "Vertical distance to estimated departure airport in meters",
					},
					map[string]any{
						"name": "firstSeen",
						"title": "First Seen",
						"type": "`$INTEGER`",
						"short": "Unix timestamp (seconds) of the first position report",
					},
					map[string]any{
						"name": "icao24",
						"title": "Icao24",
						"type": "`$STRING`",
						"short": "Unique ICAO 24-bit address of the transponder in hex string representation",
					},
					map[string]any{
						"name": "lastSeen",
						"title": "Last Seen",
						"type": "`$INTEGER`",
						"short": "Unix timestamp (seconds) of the last position report",
					},
				},
				"name": "flight",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/flights/aircraft",
								"segments": []any{
									map[string]any{
										"lit": "flights",
									},
									map[string]any{
										"lit": "aircraft",
									},
								},
								"parts": []any{
									"flights",
									"aircraft",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "begin",
											"orig": "begin",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "icao24",
											"orig": "icao24",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "aircraft",
									"exist": []any{
										"begin",
										"end",
										"icao24",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/flights/arrival",
								"segments": []any{
									map[string]any{
										"lit": "flights",
									},
									map[string]any{
										"lit": "arrival",
									},
								},
								"parts": []any{
									"flights",
									"arrival",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "airport",
											"orig": "airport",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "begin",
											"orig": "begin",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "arrival",
									"exist": []any{
										"airport",
										"begin",
										"end",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/flights/departure",
								"segments": []any{
									map[string]any{
										"lit": "flights",
									},
									map[string]any{
										"lit": "departure",
									},
								},
								"parts": []any{
									"flights",
									"departure",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "airport",
											"orig": "airport",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "begin",
											"orig": "begin",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "departure",
									"exist": []any{
										"airport",
										"begin",
										"end",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/flights/all",
								"segments": []any{
									map[string]any{
										"lit": "flights",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"flights",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "begin",
											"orig": "begin",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"begin",
										"end",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"own": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "states",
						"title": "States",
						"type": "`$ARRAY`",
						"short": "Array of state vectors",
					},
					map[string]any{
						"name": "time",
						"title": "Time",
						"type": "`$INTEGER`",
						"short": "The time which the state vectors in this response are associated with.",
					},
				},
				"name": "own",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/states/own",
								"segments": []any{
									map[string]any{
										"lit": "states",
									},
									map[string]any{
										"lit": "own",
									},
								},
								"parts": []any{
									"states",
									"own",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "icao24",
											"orig": "icao24",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "serial",
											"orig": "serial",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"icao24",
										"serial",
										"time",
									},
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
						"title": "States",
						"type": "`$ARRAY`",
						"short": "Array of state vectors",
					},
					map[string]any{
						"name": "time",
						"title": "Time",
						"type": "`$INTEGER`",
						"short": "The time which the state vectors in this response are associated with.",
					},
				},
				"name": "state_vector",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/states/all",
								"segments": []any{
									map[string]any{
										"lit": "states",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"states",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "extended",
											"orig": "extended",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "icao24",
											"orig": "icao24",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "lamax",
											"orig": "lamax",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lamin",
											"orig": "lamin",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lomax",
											"orig": "lomax",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lomin",
											"orig": "lomin",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
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
						"title": "Callsign",
						"type": "`$STRING`",
						"short": "Callsign of the vehicle",
					},
					map[string]any{
						"name": "endTime",
						"title": "End Time",
						"type": "`$INTEGER`",
						"short": "Unix timestamp (seconds) of the end of the track",
					},
					map[string]any{
						"name": "icao24",
						"title": "Icao24",
						"type": "`$STRING`",
						"short": "Unique ICAO 24-bit address of the transponder",
					},
					map[string]any{
						"name": "path",
						"title": "Path",
						"type": "`$ARRAY`",
						"short": "Array of waypoints representing the aircraft trajectory",
					},
					map[string]any{
						"name": "startTime",
						"title": "Start Time",
						"type": "`$INTEGER`",
						"short": "Unix timestamp (seconds) of the start of the track",
					},
				},
				"name": "track",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tracks",
								"segments": []any{
									map[string]any{
										"lit": "tracks",
									},
								},
								"parts": []any{
									"tracks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.path`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "icao24",
											"orig": "icao24",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"icao24",
										"time",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
