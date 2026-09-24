

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenskyNetworkSDK, BaseFeature, stdutil } from '../../..'

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


describe('StateVectorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSKY_NETWORK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenskyNetworkSDK.test()
    const ent = testsdk.StateVector()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'state_vector.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"states":{"a":true,"h":"States","n":"states","r":false,"sh":"Array of state vectors","t":"`$ARRAY`","union":{"branches":5,"count":1,"depth":2},"key$":"states","index$":0},"time":{"a":true,"h":"Time","n":"time","r":false,"sh":"The time which the state vectors in this response are associated with.","t":"`$INTEGER`","key$":"time","index$":1}},"name":"state_vector","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /states/all","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"extended","or":"extended","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"icao24","or":"icao24","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"k":"query","n":"lamax","or":"lamax","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"k":"query","n":"lamin","or":"lamin","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"lomax","or":"lomax","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"lomin","or":"lomin","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"k":"query","n":"time","or":"time","r":false,"t":"`$INTEGER`","index$":6}]},"k":"http","m":"GET","o":"/states/all","q":{"exist":["extended","icao24","lamax","lamin","lomax","lomin","time"]},"r":{},"s":[{"lit":"states"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body.states`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"state_vector","name__orig":"state_vector","Name":"StateVector","name_":"state_vector","name-":"state-vector","NAME":"STATE_VECTOR","index$":2}, {"active":true,"entity":"state_vector","key$":"BasicStateVectorFlow","kind":"basic","name":"BasicStateVectorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"state_vector_ref01"}}],"index$":0}]}, 'StateVector', {"GET /states/all":{"protocol":"http","operationId":"getAllStates","responses":{"200":{"description":"Successful response with state vectors","content":{"application/json":{"schema":{"type":"object","properties":{"time":{"description":"The time which the state vectors in this response are associated with. All vectors represent the state of a vehicle with the interval [time - 1, time].","key$":"time","type":"integer"},"states":{"description":"Array of state vectors","items":{"description":"State vector representing an aircraft's state","example":["abc9f3","CALLSIGN","United States",1458564121,1458564121,-100.5,40.5,1500,false,150,90,5,[1,2,3],1520,"1234",false,0,3],"items":{"oneOf":[{"type":"string"},{"type":"number"},{"type":"integer"},{"type":"boolean"},{"type":"array"},{"type":"null"}]},"maxItems":18,"minItems":17,"type":"array","x-ref":"#/components/schemas/StateVector"},"key$":"states","type":"array"}},"x-ref":"#/components/schemas/StateVectorResponse","index$":0}}},"headers":{"X-Rate-Limit-Remaining":{"description":"Number of remaining API credits","schema":{"type":"integer"}}}},"400":{"description":"Bad Request - Invalid parameters"},"429":{"description":"Too Many Requests - Rate limit exceeded","headers":{"X-Rate-Limit-Retry-After-Seconds":{"description":"Number of seconds until credits become available again","schema":{"type":"integer"}}}}},"parameters":[{"name":"time","in":"query","description":"The time in seconds since epoch (Unix timestamp) to retrieve states for. Current time will be used if omitted.","required":false,"schema":{"type":"integer"},"index$":0},{"name":"icao24","in":"query","description":"One or more ICAO24 transponder addresses represented by a hex string (e.g. abc9f3). To filter multiple ICAO24 append the property once for each address. If omitted, the state vectors of all aircraft are returned.","required":false,"schema":{"type":"array","items":{"type":"string"}},"explode":true,"index$":1},{"name":"lamin","in":"query","description":"Lower bound for the latitude in decimal degrees","required":false,"schema":{"type":"number","format":"float"},"index$":2},{"name":"lomin","in":"query","description":"Lower bound for the longitude in decimal degrees","required":false,"schema":{"type":"number","format":"float"},"index$":3},{"name":"lamax","in":"query","description":"Upper bound for the latitude in decimal degrees","required":false,"schema":{"type":"number","format":"float"},"index$":4},{"name":"lomax","in":"query","description":"Upper bound for the longitude in decimal degrees","required":false,"schema":{"type":"number","format":"float"},"index$":5},{"name":"extended","in":"query","description":"Set to 1 to include aircraft category information","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":6}],"security":[{},{"basicAuth":[]},{"oauth2":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Basic authentication using OpenSky username and password (deprecated for new accounts)"},"oauth2":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let state_vector_ref01_data = Object.values(setup.data.existing.state_vector)[0] as any

    // LIST
    const state_vector_ref01_ent = client.StateVector()
    const state_vector_ref01_match: any = {}

    const state_vector_ref01_list = (await state_vector_ref01_ent.list(state_vector_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/state_vector/StateVectorTestData.json')

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
    ['state_vector01','state_vector02','state_vector03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID': idmap,
    'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
    'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
    'OPENSKY_NETWORK_APIKEY': '',
    'OPENSKY_NETWORK_SECRET': '',
  })

  idmap = env['OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID']

  const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID']
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
  
