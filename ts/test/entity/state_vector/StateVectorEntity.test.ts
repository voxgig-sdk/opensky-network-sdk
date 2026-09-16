

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"states","req":false,"short":"Array of state vectors","type":"`$ARRAY`","union":{"branches":5,"count":1,"depth":2},"index$":0},{"active":true,"name":"time","req":false,"short":"The time which the state vectors in this response are associated with.","type":"`$INTEGER`","index$":1}],"name":"state_vector","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"extended","orig":"extended","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"icao24","orig":"icao24","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"kind":"query","name":"lamax","orig":"lamax","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"lamin","orig":"lamin","reqd":false,"type":"`$NUMBER`","index$":3},{"active":true,"kind":"query","name":"lomax","orig":"lomax","reqd":false,"type":"`$NUMBER`","index$":4},{"active":true,"kind":"query","name":"lomin","orig":"lomin","reqd":false,"type":"`$NUMBER`","index$":5},{"active":true,"kind":"query","name":"time","orig":"time","reqd":false,"type":"`$INTEGER`","index$":6}]},"contract":{"id":"GET /states/all","json":"{\"operationId\":\"getAllStates\",\"parameters\":[{\"description\":\"The time in seconds since epoch (Unix timestamp) to retrieve states for. Current time will be used if omitted.\",\"in\":\"query\",\"name\":\"time\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"One or more ICAO24 transponder addresses represented by a hex string (e.g. abc9f3). To filter multiple ICAO24 append the property once for each address. If omitted, the state vectors of all aircraft are returned.\",\"explode\":true,\"in\":\"query\",\"name\":\"icao24\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Lower bound for the latitude in decimal degrees\",\"in\":\"query\",\"name\":\"lamin\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Lower bound for the longitude in decimal degrees\",\"in\":\"query\",\"name\":\"lomin\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Upper bound for the latitude in decimal degrees\",\"in\":\"query\",\"name\":\"lamax\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Upper bound for the longitude in decimal degrees\",\"in\":\"query\",\"name\":\"lomax\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Set to 1 to include aircraft category information\",\"in\":\"query\",\"name\":\"extended\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"states\":{\"description\":\"Array of state vectors\",\"items\":{\"description\":\"State vector representing an aircraft's state\",\"example\":[\"abc9f3\",\"CALLSIGN\",\"United States\",1458564121,1458564121,-100.5,40.5,1500,false,150,90,5,[1,2,3],1520,\"1234\",false,0,3],\"items\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"number\"},{\"type\":\"integer\"},{\"type\":\"boolean\"},{\"type\":\"array\"},{\"type\":\"null\"}]},\"maxItems\":18,\"minItems\":17,\"type\":\"array\"},\"type\":\"array\"},\"time\":{\"description\":\"The time which the state vectors in this response are associated with. All vectors represent the state of a vehicle with the interval [time - 1, time].\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with state vectors\",\"headers\":{\"X-Rate-Limit-Remaining\":{\"description\":\"Number of remaining API credits\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\",\"headers\":{\"X-Rate-Limit-Retry-After-Seconds\":{\"description\":\"Number of seconds until credits become available again\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/states/all","segments":[{"lit":"states"},{"lit":"all"}],"select":{"exist":["extended","icao24","lamax","lamin","lomax","lomin","time"]},"transform":{"req":"`reqdata`","res":"`body.states`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"icao24","orig":"icao24","reqd":false,"type":"`$ARRAY`","index$":0},{"active":true,"kind":"query","name":"serial","orig":"serial","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"kind":"query","name":"time","orig":"time","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /states/own","json":"{\"operationId\":\"getOwnStates\",\"parameters\":[{\"description\":\"The time in seconds since epoch (Unix timestamp) to retrieve states for. Current time will be used if omitted.\",\"in\":\"query\",\"name\":\"time\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"One or more ICAO24 transponder addresses represented by a hex string (e.g. abc9f3). To filter multiple ICAO24 append the property once for each address. If omitted, the state vectors of all aircraft are returned.\",\"explode\":true,\"in\":\"query\",\"name\":\"icao24\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Retrieve only states of a subset of your receivers. You can pass this argument several times to filter state of more than one of your receivers.\",\"explode\":true,\"in\":\"query\",\"name\":\"serials\",\"required\":false,\"schema\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"states\":{\"description\":\"Array of state vectors\",\"items\":{\"description\":\"State vector representing an aircraft's state\",\"example\":[\"abc9f3\",\"CALLSIGN\",\"United States\",1458564121,1458564121,-100.5,40.5,1500,false,150,90,5,[1,2,3],1520,\"1234\",false,0,3],\"items\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"number\"},{\"type\":\"integer\"},{\"type\":\"boolean\"},{\"type\":\"array\"},{\"type\":\"null\"}]},\"maxItems\":18,\"minItems\":17,\"type\":\"array\"},\"type\":\"array\"},\"time\":{\"description\":\"The time which the state vectors in this response are associated with. All vectors represent the state of a vehicle with the interval [time - 1, time].\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with state vectors\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing authentication\"},\"403\":{\"description\":\"Forbidden - Authentication required\"}},\"security\":[{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/states/own","segments":[{"lit":"states"},{"lit":"own"}],"select":{"exist":["icao24","serial","time"]},"transform":{"req":"`reqdata`","res":"`body.states`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"state_vector","name__orig":"state_vector","Name":"StateVector","name_":"state_vector","name-":"state-vector","NAME":"STATE_VECTOR","index$":1}, {"active":true,"entity":"state_vector","key$":"BasicStateVectorFlow","kind":"basic","name":"BasicStateVectorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"state_vector_ref01"}}],"index$":0}]}, 'StateVector')
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
  
