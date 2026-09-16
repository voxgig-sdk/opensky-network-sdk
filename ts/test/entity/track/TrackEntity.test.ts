

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


describe('TrackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSKY_NETWORK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenskyNetworkSDK.test()
    const ent = testsdk.Track()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'track.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"callsign","req":false,"short":"Callsign of the vehicle","type":"`$STRING`","index$":0},{"active":true,"name":"endTime","req":false,"short":"Unix timestamp (seconds) of the end of the track","type":"`$INTEGER`","index$":1},{"active":true,"name":"icao24","req":false,"short":"Unique ICAO 24-bit address of the transponder","type":"`$STRING`","index$":2},{"active":true,"name":"path","req":false,"short":"Array of waypoints representing the aircraft trajectory","type":"`$ARRAY`","union":{"branches":3,"count":1,"depth":2},"index$":3},{"active":true,"name":"startTime","req":false,"short":"Unix timestamp (seconds) of the start of the track","type":"`$INTEGER`","index$":4}],"name":"track","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"icao24","orig":"icao24","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"time","orig":"time","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /tracks","json":"{\"operationId\":\"getTrackByAircraft\",\"parameters\":[{\"description\":\"ICAO24 transponder address represented by a hex string\",\"in\":\"query\",\"name\":\"icao24\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Unix timestamp (seconds) for which the track should be retrieved\",\"in\":\"query\",\"name\":\"time\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"callsign\":{\"description\":\"Callsign of the vehicle\",\"nullable\":true,\"type\":\"string\"},\"endTime\":{\"description\":\"Unix timestamp (seconds) of the end of the track\",\"type\":\"integer\"},\"icao24\":{\"description\":\"Unique ICAO 24-bit address of the transponder\",\"type\":\"string\"},\"path\":{\"description\":\"Array of waypoints representing the aircraft trajectory\",\"items\":{\"description\":\"Waypoint [time, latitude, longitude, altitude, on_ground]\",\"items\":{\"oneOf\":[{\"type\":\"number\"},{\"type\":\"integer\"},{\"type\":\"boolean\"},{\"type\":\"null\"}]},\"maxItems\":5,\"minItems\":5,\"type\":\"array\"},\"type\":\"array\"},\"startTime\":{\"description\":\"Unix timestamp (seconds) of the start of the track\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with track data\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"404\":{\"description\":\"Not Found - No track found for the given aircraft and time\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{},{\"basicAuth\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Basic authentication using OpenSky username and password (deprecated for new accounts)\",\"scheme\":\"basic\",\"type\":\"http\"},\"oauth2\":{\"bearerFormat\":\"JWT\",\"description\":\"OAuth2 Client Credentials Flow. Obtain access token from https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tracks","segments":[{"lit":"tracks"}],"select":{"exist":["icao24","time"]},"transform":{"req":"`reqdata`","res":"`body.path`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"track","name__orig":"track","Name":"Track","name_":"track","name-":"track","NAME":"TRACK","index$":2}, {"active":true,"entity":"track","key$":"BasicTrackFlow","kind":"basic","name":"BasicTrackFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"track_ref01"}}],"index$":0}]}, 'Track')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let track_ref01_data = Object.values(setup.data.existing.track)[0] as any

    // LIST
    const track_ref01_ent = client.Track()
    const track_ref01_match: any = {}

    const track_ref01_list = (await track_ref01_ent.list(track_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/track/TrackTestData.json')

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
    ['track01','track02','track03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSKY_NETWORK_TEST_TRACK_ENTID': idmap,
    'OPENSKY_NETWORK_TEST_LIVE': 'FALSE',
    'OPENSKY_NETWORK_TEST_EXPLAIN': 'FALSE',
    'OPENSKY_NETWORK_APIKEY': '',
    'OPENSKY_NETWORK_SECRET': '',
  })

  idmap = env['OPENSKY_NETWORK_TEST_TRACK_ENTID']

  const live = 'TRUE' === env.OPENSKY_NETWORK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSKY_NETWORK_TEST_TRACK_ENTID']
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
  
