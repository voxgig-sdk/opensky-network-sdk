

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


describe('TrackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSKY_NETWORK_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSKY_NETWORK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenskyNetworkSDK.test()
    const ent = testsdk.Track()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('track hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OpenskyNetworkSDK.test(offline).Track().stream('list')) { }
    }, /offline/)

    for await (const _item of OpenskyNetworkSDK.test(offline).Track()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OpenskyNetworkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Track().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OpenskyNetworkSDK.test().Track().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OpenskyNetworkSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Track().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Track().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OpenskyNetworkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Track().list({"icao24":1,"time":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSKY_NETWORK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'track.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"callsign":{"a":true,"h":"Callsign","n":"callsign","r":false,"sh":"Callsign of the vehicle","t":"`$STRING`","key$":"callsign","index$":0},"endTime":{"a":true,"h":"End Time","n":"endTime","r":false,"sh":"Unix timestamp (seconds) of the end of the track","t":"`$INTEGER`","key$":"endTime","index$":1},"icao24":{"a":true,"h":"Icao24","n":"icao24","r":false,"sh":"Unique ICAO 24-bit address of the transponder","t":"`$STRING`","key$":"icao24","index$":2},"path":{"a":true,"h":"Path","n":"path","r":false,"sh":"Array of waypoints representing the aircraft trajectory","t":"`$ARRAY`","union":{"branches":3,"count":1,"depth":2},"key$":"path","index$":3},"startTime":{"a":true,"h":"Start Time","n":"startTime","r":false,"sh":"Unix timestamp (seconds) of the start of the track","t":"`$INTEGER`","key$":"startTime","index$":4}},"name":"track","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /tracks","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"icao24","or":"icao24","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"time","or":"time","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/tracks","q":{"exist":["icao24","time"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"tracks"}],"t":{"req":"`reqdata`","res":"`body.path`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"track","name__orig":"track","Name":"Track","name_":"track","name-":"track","NAME":"TRACK","index$":3}, {"active":true,"entity":"track","key$":"BasicTrackFlow","kind":"basic","name":"BasicTrackFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"track_ref01"}}],"index$":0}]}, 'Track', {"GET /tracks":{"protocol":"http","parameters":[{"name":"icao24","in":"query","description":"ICAO24 transponder address represented by a hex string","required":true,"schema":{"type":"string"},"index$":0},{"name":"time","in":"query","description":"Unix timestamp (seconds) for which the track should be retrieved","required":true,"schema":{"type":"integer"},"index$":1}]}}, { strict: LIVE_STRICT, t })
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
  
