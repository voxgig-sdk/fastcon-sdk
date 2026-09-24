

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


describe('ProxyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FASTCON_TEST_LIVE=TRUE.
  afterEach(liveDelay('FASTCON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FastconSDK.test()
    const ent = testsdk.Proxy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FASTCON_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'proxy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the proxy server","t":"`$STRING`","key$":"id","index$":0},"port":{"a":true,"h":"Port","n":"port","r":true,"sh":"Proxy server port number","t":"`$INTEGER`","key$":"port","index$":1},"secret":{"a":true,"h":"Secret","n":"secret","r":true,"sh":"Secret key for proxy authentication","t":"`$STRING`","key$":"secret","index$":2},"server":{"a":true,"h":"Server","n":"server","r":true,"sh":"Proxy server hostname or IP address","t":"`$STRING`","key$":"server","index$":3}},"id":{"field":"id","name":"id"},"name":"proxy","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/proxies","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/proxies","q":{},"r":{},"s":[{"lit":"api"},{"lit":"proxies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"proxy","name__orig":"proxy","Name":"Proxy","name_":"proxy","name-":"proxy","NAME":"PROXY","index$":1}, {"active":true,"entity":"proxy","key$":"BasicProxyFlow","kind":"basic","name":"BasicProxyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"proxy_ref01"}}],"index$":0}]}, 'Proxy', {"GET /api/proxies":{"protocol":"http","operationId":"getTelegramProxyList","responses":{"200":{"description":"Successful response with proxy list","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"V2Ray-based VLESS or Trojan proxy configuration","properties":{"id":{"type":"string","description":"Unique identifier for the proxy server","key$":"id"},"server":{"type":"string","description":"Proxy server hostname or IP address","key$":"server"},"port":{"type":"integer","description":"Proxy server port number","minimum":1,"maximum":65535,"key$":"port"},"secret":{"type":"string","description":"Secret key for proxy authentication","key$":"secret"}},"required":["server","port","secret"],"x-ref":"#/components/schemas/ProxyConfiguration","index$":0}},"example":[{"id":"1","server":"example.proxy.com","port":443,"secret":"dd00000000000000000000000000000000"}]}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let proxy_ref01_data = Object.values(setup.data.existing.proxy)[0] as any

    // LIST
    const proxy_ref01_ent = client.Proxy()
    const proxy_ref01_match: any = {}

    const proxy_ref01_list = (await proxy_ref01_ent.list(proxy_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/proxy/ProxyTestData.json')

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
    ['proxy01','proxy02','proxy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FASTCON_TEST_PROXY_ENTID': idmap,
    'FASTCON_TEST_LIVE': 'FALSE',
    'FASTCON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FASTCON_TEST_PROXY_ENTID']

  const live = 'TRUE' === env.FASTCON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FASTCON_TEST_PROXY_ENTID']
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
  
