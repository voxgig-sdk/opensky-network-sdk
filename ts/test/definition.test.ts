import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "flight",
    "accessor": "Flight",
    "op": "list",
    "method": "GET",
    "path": "/flights/aircraft",
    "action": "aircraft",
    "args": [],
    "select": {
      "begin": "v1",
      "end": "v1",
      "icao24": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "icao24",
      "begin",
      "end"
    ],
    "queryArgs": [
      {
        "name": "begin",
        "wire": "begin"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "icao24",
        "wire": "icao24"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "icao24": "x",
        "firstSeen": 1,
        "estDepartureAirport": "x",
        "lastSeen": 1,
        "estArrivalAirport": "x",
        "callsign": "x",
        "estDepartureAirportHorizDistance": 1,
        "estDepartureAirportVertDistance": 1,
        "estArrivalAirportHorizDistance": 1,
        "estArrivalAirportVertDistance": 1,
        "departureAirportCandidatesCount": 1,
        "arrivalAirportCandidatesCount": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "flight",
    "accessor": "Flight",
    "op": "list",
    "method": "GET",
    "path": "/flights/arrival",
    "action": "arrival",
    "args": [],
    "select": {
      "airport": "v1",
      "begin": "v1",
      "end": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "airport",
      "begin",
      "end"
    ],
    "queryArgs": [
      {
        "name": "airport",
        "wire": "airport"
      },
      {
        "name": "begin",
        "wire": "begin"
      },
      {
        "name": "end",
        "wire": "end"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "icao24": "x",
        "firstSeen": 1,
        "estDepartureAirport": "x",
        "lastSeen": 1,
        "estArrivalAirport": "x",
        "callsign": "x",
        "estDepartureAirportHorizDistance": 1,
        "estDepartureAirportVertDistance": 1,
        "estArrivalAirportHorizDistance": 1,
        "estArrivalAirportVertDistance": 1,
        "departureAirportCandidatesCount": 1,
        "arrivalAirportCandidatesCount": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "flight",
    "accessor": "Flight",
    "op": "list",
    "method": "GET",
    "path": "/flights/departure",
    "action": "departure",
    "args": [],
    "select": {
      "airport": "v1",
      "begin": "v1",
      "end": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "airport",
      "begin",
      "end"
    ],
    "queryArgs": [
      {
        "name": "airport",
        "wire": "airport"
      },
      {
        "name": "begin",
        "wire": "begin"
      },
      {
        "name": "end",
        "wire": "end"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "icao24": "x",
        "firstSeen": 1,
        "estDepartureAirport": "x",
        "lastSeen": 1,
        "estArrivalAirport": "x",
        "callsign": "x",
        "estDepartureAirportHorizDistance": 1,
        "estDepartureAirportVertDistance": 1,
        "estArrivalAirportHorizDistance": 1,
        "estArrivalAirportVertDistance": 1,
        "departureAirportCandidatesCount": 1,
        "arrivalAirportCandidatesCount": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "flight",
    "accessor": "Flight",
    "op": "list",
    "method": "GET",
    "path": "/flights/all",
    "action": "all",
    "args": [],
    "select": {
      "begin": "v1",
      "end": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "begin",
      "end"
    ],
    "queryArgs": [
      {
        "name": "begin",
        "wire": "begin"
      },
      {
        "name": "end",
        "wire": "end"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "icao24": "x",
        "firstSeen": 1,
        "estDepartureAirport": "x",
        "lastSeen": 1,
        "estArrivalAirport": "x",
        "callsign": "x",
        "estDepartureAirportHorizDistance": 1,
        "estDepartureAirportVertDistance": 1,
        "estArrivalAirportHorizDistance": 1,
        "estArrivalAirportVertDistance": 1,
        "departureAirportCandidatesCount": 1,
        "arrivalAirportCandidatesCount": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "own",
    "accessor": "Own",
    "op": "list",
    "method": "GET",
    "path": "/states/own",
    "args": [],
    "select": {
      "icao24": "v1",
      "serial": "v1",
      "time": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "time",
      "icao24",
      "serials"
    ],
    "queryArgs": [
      {
        "name": "icao24",
        "wire": "icao24"
      },
      {
        "name": "serial",
        "wire": "serials"
      },
      {
        "name": "time",
        "wire": "time"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "time": 1,
      "states": [
        [
          "abc9f3",
          "CALLSIGN",
          "United States"
        ]
      ]
    },
    "idField": "id"
  },
  {
    "entity": "state_vector",
    "accessor": "StateVector",
    "op": "list",
    "method": "GET",
    "path": "/states/all",
    "args": [],
    "select": {
      "extended": "v1",
      "icao24": "v1",
      "lamax": "v1",
      "lamin": "v1",
      "lomax": "v1",
      "lomin": "v1",
      "time": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "time",
      "icao24",
      "lamin",
      "lomin",
      "lamax",
      "lomax",
      "extended"
    ],
    "queryArgs": [
      {
        "name": "extended",
        "wire": "extended"
      },
      {
        "name": "icao24",
        "wire": "icao24"
      },
      {
        "name": "lamax",
        "wire": "lamax"
      },
      {
        "name": "lamin",
        "wire": "lamin"
      },
      {
        "name": "lomax",
        "wire": "lomax"
      },
      {
        "name": "lomin",
        "wire": "lomin"
      },
      {
        "name": "time",
        "wire": "time"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "time": 1,
      "states": [
        [
          "abc9f3",
          "CALLSIGN",
          "United States"
        ]
      ]
    },
    "idField": "id"
  },
  {
    "entity": "track",
    "accessor": "Track",
    "op": "list",
    "method": "GET",
    "path": "/tracks",
    "args": [],
    "select": {
      "icao24": "v1",
      "time": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "icao24",
      "time"
    ],
    "queryArgs": [
      {
        "name": "icao24",
        "wire": "icao24"
      },
      {
        "name": "time",
        "wire": "time"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "icao24": "x",
      "startTime": 1,
      "endTime": 1,
      "callsign": "x",
      "path": [
        [
          1
        ]
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
