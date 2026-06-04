package core

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
						"name": "arrival_airport_candidates_count",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "callsign",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "departure_airport_candidates_count",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "est_arrival_airport",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "est_arrival_airport_horiz_distance",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "est_arrival_airport_vert_distance",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "est_departure_airport",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "est_departure_airport_horiz_distance",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "est_departure_airport_vert_distance",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "first_seen",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "icao24",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "last_seen",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 11,
					},
				},
				"name": "flight",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "begin",
											"orig": "begin",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 3,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"state_vector": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "state",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "time",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "state_vector",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "extended",
											"orig": "extended",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "lamax",
											"orig": "lamax",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "lamin",
											"orig": "lamin",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "lomax",
											"orig": "lomax",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "lomin",
											"orig": "lomin",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "icao24",
											"orig": "icao24",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "serial",
											"orig": "serial",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "end_time",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "icao24",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "path",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "start_time",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "track",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
