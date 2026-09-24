"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Fastcon',
        slug: "fastcon",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://fastcon.harknmav.fun",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            ping: {},
            proxy: {},
        }
    };
    entity = {
        "ping": {
            "fields": [
                {
                    "name": "server_id",
                    "title": "Server Id",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The ID of the pinged server"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Status of the ping operation"
                },
                {
                    "name": "time",
                    "title": "Time",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Ping time in milliseconds"
                }
            ],
            "name": "ping",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/ping",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "ping"
                                }
                            ],
                            "parts": [
                                "api",
                                "ping"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "proxy": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the proxy server"
                },
                {
                    "name": "port",
                    "title": "Port",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Proxy server port number"
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Secret key for proxy authentication"
                },
                {
                    "name": "server",
                    "title": "Server",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Proxy server hostname or IP address"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "proxy",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/proxies",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "proxies"
                                }
                            ],
                            "parts": [
                                "api",
                                "proxies"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map