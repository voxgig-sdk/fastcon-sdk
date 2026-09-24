

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"server_id":{"a":true,"h":"Server Id","n":"server_id","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The ID of the pinged server","t":"`$STRING`","key$":"server_id","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status of the ping operation","t":"`$STRING`","key$":"status","index$":1},"time":{"a":true,"h":"Time","n":"time","r":true,"sh":"Ping time in milliseconds","t":"`$NUMBER`","key$":"time","index$":2}},"name":"ping","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/ping","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/ping","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ping"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"ping","name__orig":"ping","Name":"Ping","name_":"ping","name-":"ping","NAME":"PING","index$":0}, {"active":true,"entity":"ping","key$":"BasicPingFlow","kind":"basic","name":"BasicPingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ping_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Ping', {"POST /api/ping":{"protocol":"http","operationId":"pingServer","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["server_id"],"properties":{"server_id":{"type":"string","description":"The ID of the proxy server to ping","key$":"server_id"}},"index$":1},"example":{"server_id":"1"}}}},"responses":{"200":{"description":"Successful ping response","content":{"application/json":{"schema":{"type":"object","description":"Result of a ping test to a proxy server","properties":{"server_id":{"type":"string","description":"The ID of the pinged server","key$":"server_id"},"time":{"type":"number","description":"Ping time in milliseconds","key$":"time"},"status":{"type":"string","description":"Status of the ping operation","enum":["success","failed","timeout"],"key$":"status"}},"required":["time"],"x-ref":"#/components/schemas/PingResult","index$":0},"example":{"server_id":"1","time":45,"status":"success"}}}},"400":{"description":"Bad request - invalid server ID","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Server not found","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
