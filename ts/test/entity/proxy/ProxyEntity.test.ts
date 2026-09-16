

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Unique identifier for the proxy server","type":"`$STRING`","index$":0},{"active":true,"name":"port","req":true,"short":"Proxy server port number","type":"`$INTEGER`","index$":1},{"active":true,"name":"secret","req":true,"short":"Secret key for proxy authentication","type":"`$STRING`","index$":2},{"active":true,"name":"server","req":true,"short":"Proxy server hostname or IP address","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"proxy","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/proxies","json":"{\"operationId\":\"getTelegramProxyList\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"id\":\"1\",\"port\":443,\"secret\":\"dd00000000000000000000000000000000\",\"server\":\"example.proxy.com\"}],\"schema\":{\"items\":{\"description\":\"V2Ray-based VLESS or Trojan proxy configuration\",\"properties\":{\"id\":{\"description\":\"Unique identifier for the proxy server\",\"type\":\"string\"},\"port\":{\"description\":\"Proxy server port number\",\"maximum\":65535,\"minimum\":1,\"type\":\"integer\"},\"secret\":{\"description\":\"Secret key for proxy authentication\",\"type\":\"string\"},\"server\":{\"description\":\"Proxy server hostname or IP address\",\"type\":\"string\"}},\"required\":[\"server\",\"port\",\"secret\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with proxy list\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/proxies","segments":[{"lit":"api"},{"lit":"proxies"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"proxy","name__orig":"proxy","Name":"Proxy","name_":"proxy","name-":"proxy","NAME":"PROXY","index$":1}, {"active":true,"entity":"proxy","key$":"BasicProxyFlow","kind":"basic","name":"BasicProxyFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"proxy_ref01"}}],"index$":0}]}, 'Proxy')
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
  
