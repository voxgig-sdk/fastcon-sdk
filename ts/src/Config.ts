
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Fastcon',
        slug: "fastcon",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://fastcon.harknmav.fun",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      ping: {
      },

      proxy: {
      },

    }
  }


  entity = {
    "ping": {
      "fields": [
        {
          "name": "server_id",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The ID of the pinged server",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "short": "Status of the ping operation",
          "type": "`$STRING`"
        },
        {
          "name": "time",
          "req": true,
          "short": "Ping time in milliseconds",
          "type": "`$NUMBER`"
        }
      ],
      "name": "ping",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "ping"
              ]
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
          "short": "Unique identifier for the proxy server",
          "type": "`$STRING`"
        },
        {
          "name": "port",
          "req": true,
          "short": "Proxy server port number",
          "type": "`$INTEGER`"
        },
        {
          "name": "secret",
          "req": true,
          "short": "Secret key for proxy authentication",
          "type": "`$STRING`"
        },
        {
          "name": "server",
          "req": true,
          "short": "Proxy server hostname or IP address",
          "type": "`$STRING`"
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
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "proxies"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

