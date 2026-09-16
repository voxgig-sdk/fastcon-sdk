

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FastconSDK, BaseFeature, stdutil } from '../../..'

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


describe('PingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FASTCON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FASTCON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FastconSDK.test()
    const ent = testsdk.Ping()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FASTCON_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ping.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"server_id","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"The ID of the pinged server","type":"`$STRING`","index$":0},{"active":true,"name":"status","req":false,"short":"Status of the ping operation","type":"`$STRING`","index$":1},{"active":true,"name":"time","req":true,"short":"Ping time in milliseconds","type":"`$NUMBER`","index$":2}],"name":"ping","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/ping","json":"{\"operationId\":\"pingServer\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"server_id\":\"1\"},\"schema\":{\"properties\":{\"server_id\":{\"description\":\"The ID of the proxy server to ping\",\"type\":\"string\"}},\"required\":[\"server_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"server_id\":\"1\",\"status\":\"success\",\"time\":45},\"schema\":{\"description\":\"Result of a ping test to a proxy server\",\"properties\":{\"server_id\":{\"description\":\"The ID of the pinged server\",\"type\":\"string\"},\"status\":{\"description\":\"Status of the ping operation\",\"enum\":[\"success\",\"failed\",\"timeout\"],\"type\":\"string\"},\"time\":{\"description\":\"Ping time in milliseconds\",\"type\":\"number\"}},\"required\":[\"time\"],\"type\":\"object\"}}},\"description\":\"Successful ping response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid server ID\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Server not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/ping","segments":[{"lit":"api"},{"lit":"ping"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"ping","name__orig":"ping","Name":"Ping","name_":"ping","name-":"ping","NAME":"PING","index$":0}, {"active":true,"entity":"ping","key$":"BasicPingFlow","kind":"basic","name":"BasicPingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ping_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Ping')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ping_ref01_ent = client.Ping()
    let ping_ref01_data = setup.data.new.ping['ping_ref01']

    ping_ref01_data = (await ping_ref01_ent.create(ping_ref01_data)).data()
    assert(null != ping_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ping/PingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FastconSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ping01','ping02','ping03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FASTCON_TEST_PING_ENTID': idmap,
    'FASTCON_TEST_LIVE': 'FALSE',
    'FASTCON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FASTCON_TEST_PING_ENTID']

  const live = 'TRUE' === env.FASTCON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FASTCON_TEST_PING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FastconSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
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
    explain: 'TRUE' === env.FASTCON_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
