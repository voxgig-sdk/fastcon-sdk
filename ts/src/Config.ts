
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


  main = {
    name: 'Fastcon',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://fastcon.harknmav.fun',

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
          "active": true,
          "name": "server_id",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "time",
          "req": true,
          "type": "`$NUMBER`",
          "index$": 2
        }
      ],
      "name": "ping",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "proxy": {
      "fields": [
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "port",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "secret",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "server",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "proxy",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
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

