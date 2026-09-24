"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FASTCON_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FASTCON_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FastconSDK.test();
        const ent = testsdk.Ping();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FASTCON_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ping.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "server_id": { "a": true, "h": "Server Id", "n": "server_id", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The ID of the pinged server", "t": "`$STRING`", "key$": "server_id", "index$": 0 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Status of the ping operation", "t": "`$STRING`", "key$": "status", "index$": 1 }, "time": { "a": true, "h": "Time", "n": "time", "r": true, "sh": "Ping time in milliseconds", "t": "`$NUMBER`", "key$": "time", "index$": 2 } }, "name": "ping", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/ping", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/ping", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "ping" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "ping", "name__orig": "ping", "Name": "Ping", "name_": "ping", "name-": "ping", "NAME": "PING", "index$": 0 }, { "active": true, "entity": "ping", "key$": "BasicPingFlow", "kind": "basic", "name": "BasicPingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ping_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Ping', { "POST /api/ping": { "protocol": "http", "operationId": "pingServer", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["server_id"], "properties": { "server_id": { "type": "string", "description": "The ID of the proxy server to ping", "key$": "server_id" } }, "index$": 1 }, "example": { "server_id": "1" } } } }, "responses": { "200": { "description": "Successful ping response", "content": { "application/json": { "schema": { "type": "object", "description": "Result of a ping test to a proxy server", "properties": { "server_id": { "type": "string", "description": "The ID of the pinged server", "key$": "server_id" }, "time": { "type": "number", "description": "Ping time in milliseconds", "key$": "time" }, "status": { "type": "string", "description": "Status of the ping operation", "enum": ["success", "failed", "timeout"], "key$": "status" } }, "required": ["time"], "x-ref": "#/components/schemas/PingResult", "index$": 0 }, "example": { "server_id": "1", "time": 45, "status": "success" } } } }, "400": { "description": "Bad request - invalid server ID", "content": { "application/json": { "schema": { "type": "object", "description": "Error response", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "404": { "description": "Server not found", "content": { "application/json": { "schema": { "type": "object", "description": "Error response", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "description": "Error response", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ping_ref01_ent = client.Ping();
        let ping_ref01_data = setup.data.new.ping['ping_ref01'];
        ping_ref01_data = (await ping_ref01_ent.create(ping_ref01_data)).data();
        (0, node_assert_1.default)(null != ping_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ping/PingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FastconSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ping01', 'ping02', 'ping03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FASTCON_TEST_PING_ENTID': idmap,
        'FASTCON_TEST_LIVE': 'FALSE',
        'FASTCON_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FASTCON_TEST_PING_ENTID'];
    const live = 'TRUE' === env.FASTCON_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FASTCON_TEST_PING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FastconSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PingEntity.test.js.map