
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://opensky-network.org/api',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      flight: {
      },

      state_vector: {
      },

      track: {
      },

    }
  }


  entity = {
    "flight": {
      "fields": [
        {
          "name": "arrival_airport_candidates_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "callsign",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "departure_airport_candidates_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "est_arrival_airport",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "est_arrival_airport_horiz_distance",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "est_arrival_airport_vert_distance",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "est_departure_airport",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "est_departure_airport_horiz_distance",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "est_departure_airport_vert_distance",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "first_seen",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "icao24",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "last_seen",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        }
      ],
      "name": "flight",
      "op": {
        "list": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "icao24",
                    "orig": "icao24",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/flights/aircraft",
              "parts": [
                "flights",
                "aircraft"
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "airport",
                    "orig": "airport",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "begin",
                    "orig": "begin",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/flights/arrival",
              "parts": [
                "flights",
                "arrival"
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "airport",
                    "orig": "airport",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "begin",
                    "orig": "begin",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/flights/departure",
              "parts": [
                "flights",
                "departure"
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
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "begin",
                    "orig": "begin",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/flights/all",
              "parts": [
                "flights",
                "all"
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
              "active": true,
              "index$": 3
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "state_vector": {
      "fields": [
        {
          "name": "state",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "time",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "state_vector",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "extended",
                    "orig": "extended",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "icao24",
                    "orig": "icao24",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "lamax",
                    "orig": "lamax",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "lamin",
                    "orig": "lamin",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "lomax",
                    "orig": "lomax",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "lomin",
                    "orig": "lomin",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "time",
                    "orig": "time",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/states/all",
              "parts": [
                "states",
                "all"
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "icao24",
                    "orig": "icao24",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "serial",
                    "orig": "serial",
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "time",
                    "orig": "time",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/states/own",
              "parts": [
                "states",
                "own"
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
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "end_time",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "icao24",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "path",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 3
        },
        {
          "name": "start_time",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "track",
      "op": {
        "list": {
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
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "time",
                    "orig": "time",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/tracks",
              "parts": [
                "tracks"
              ],
              "select": {
                "exist": [
                  "icao24",
                  "time"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

