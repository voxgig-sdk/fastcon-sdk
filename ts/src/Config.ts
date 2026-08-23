
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "api",
                "ping"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "proxies"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

