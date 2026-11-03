

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenskyNetworkSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FlightEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSKY_NETWORK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenskyNetworkSDK.test()
    const ent = testsdk.Flight()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'flight.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arrivalAirportCandidatesCount":{"a":true,"h":"Arrival Airport Candidates Count","n":"arrivalAirportCandidatesCount","r":false,"sh":"Number of candidates for arrival airport","t":"`$INTEGER`","key$":"arrivalAirportCandidatesCount","index$":0},"callsign":{"a":true,"h":"Callsign","n":"callsign","r":false,"sh":"Callsign of the vehicle (8 chars)","t":"`$STRING`","key$":"callsign","index$":1},"departureAirportCandidatesCount":{"a":true,"h":"Departure Airport Candidates Count","n":"departureAirportCandidatesCount","r":false,"sh":"Number of candidates for departure airport","t":"`$INTEGER`","key$":"departureAirportCandidatesCount","index$":2},"estArrivalAirport":{"a":true,"h":"Est Arrival Airport","n":"estArrivalAirport","r":false,"sh":"Estimated arrival airport ICAO code","t":"`$STRING`","key$":"estArrivalAirport","index$":3},"estArrivalAirportHorizDistance":{"a":true,"h":"Est Arrival Airport Horiz Distance","n":"estArrivalAirportHorizDistance","r":false,"sh":"Horizontal distance to estimated arrival airport in meters","t":"`$INTEGER`","key$":"estArrivalAirportHorizDistance","index$":4},"estArrivalAirportVertDistance":{"a":true,"h":"Est Arrival Airport Vert Distance","n":"estArrivalAirportVertDistance","r":false,"sh":"Vertical distance to estimated arrival airport in meters","t":"`$INTEGER`","key$":"estArrivalAirportVertDistance","index$":5},"estDepartureAirport":{"a":true,"h":"Est Departure Airport","n":"estDepartureAirport","r":false,"sh":"Estimated departure airport ICAO code","t":"`$STRING`","key$":"estDepartureAirport","index$":6},"estDepartureAirportHorizDistance":{"a":true,"h":"Est Departure Airport Horiz Distance","n":"estDepartureAirportHorizDistance","r":false,"sh":"Horizontal distance to estimated departure airport in meters","t":"`$INTEGER`","key$":"estDepartureAirportHorizDistance","index$":7},"estDepartureAirportVertDistance":{"a":true,"h":"Est Departure Airport Vert Distance","n":"estDepartureAirportVertDistance","r":false,"sh":"Vertical distance to estimated departure airport in meters","t":"`$INTEGER`","key$":"estDepartureAirportVertDistance","index$":8},"firstSeen":{"a":true,"h":"First Seen","n":"firstSeen","r":false,"sh":"Unix timestamp (seconds) of the first position report","t":"`$INTEGER`","key$":"firstSeen","index$":9},"icao24":{"a":true,"h":"Icao24","n":"icao24","r":false,"sh":"Unique ICAO 24-bit address of the transponder in hex string representation","t":"`$STRING`","key$":"icao24","index$":10},"lastSeen":{"a":true,"h":"Last Seen","n":"lastSeen","r":false,"sh":"Unix timestamp (seconds) of the last position report","t":"`$INTEGER`","key$":"lastSeen","index$":11}},"name":"flight","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /flights/aircraft","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"begin","or":"begin","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"end","or":"end","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"icao24","or":"icao24","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/flights/aircraft","q":{"$action":"aircraft","exist":["begin","end","icao24"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"flights"},{"lit":"aircraft"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /flights/arrival","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"airport","or":"airport","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"begin","or":"begin","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"end","or":"end","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/flights/arrival","q":{"$action":"arrival","exist":["airport","begin","end"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"flights"},{"lit":"arrival"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /flights/departure","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"airport","or":"airport","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"begin","or":"begin","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"end","or":"end","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/flights/departure","q":{"$action":"departure","exist":["airport","begin","end"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"flights"},{"lit":"departure"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /flights/all","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"begin","or":"begin","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"end","or":"end","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/flights/all","q":{"$action":"all","exist":["begin","end"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"flights"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"flight","name__orig":"flight","Name":"Flight","name_":"flight","name-":"flight","NAME":"FLIGHT","index$":0}, {"active":true,"entity":"flight","key$":"BasicFlightFlow","kind":"basic","name":"BasicFlightFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"flight_ref01"}}],"unreachable":true}]}, 'Flight', {"GET /flights/aircraft":{"protocol":"http","parameters":[{"name":"icao24","in":"query","description":"ICAO24 transponder address represented by a hex string","required":true,"schema":{"type":"string"},"index$":0},{"name":"begin","in":"query","description":"Start of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":1},{"name":"end","in":"query","description":"End of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":2}]},"GET /flights/arrival":{"protocol":"http","parameters":[{"name":"airport","in":"query","description":"ICAO airport code","required":true,"schema":{"type":"string"},"index$":0},{"name":"begin","in":"query","description":"Start of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":1},{"name":"end","in":"query","description":"End of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":2}]},"GET /flights/departure":{"protocol":"http","parameters":[{"name":"airport","in":"query","description":"ICAO airport code","required":true,"schema":{"type":"string"},"index$":0},{"name":"begin","in":"query","description":"Start of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":1},{"name":"end","in":"query","description":"End of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":2}]},"GET /flights/all":{"protocol":"http","parameters":[{"name":"begin","in":"query","description":"Start of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":0},{"name":"end","in":"query","description":"End of time interval in seconds since epoch (Unix timestamp)","required":true,"schema":{"type":"integer"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let flight_ref01_data = Object.values(setup.data.existing.flight)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/flight/FlightTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenskyNetworkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['flight01','flight02','flight03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSKY_NETWORK_TEST_FLIGHT_ENTID': idmap,
    'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
    'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
    'OPENSKY_NETWORK_APIKEY': '',
    'OPENSKY_NETWORK_SECRET': '',
  })

  idmap = env['OPENSKY_NETWORK_TEST_FLIGHT_ENTID']

  const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSKY_NETWORK_TEST_FLIGHT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenskyNetworkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
