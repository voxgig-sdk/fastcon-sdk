-- Fastcon SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Fastcon",
      slug = "fastcon",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://fastcon.harknmav.fun",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["ping"] = {},
        ["proxy"] = {},
      },
    },
    entity = {
      ["ping"] = {
        ["fields"] = {
          {
            ["name"] = "server_id",
            ["title"] = "Server Id",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The ID of the pinged server",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Status of the ping operation",
          },
          {
            ["name"] = "time",
            ["title"] = "Time",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Ping time in milliseconds",
          },
        },
        ["name"] = "ping",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/ping",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ping",
                  },
                },
                ["parts"] = {
                  "api",
                  "ping",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["proxy"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the proxy server",
          },
          {
            ["name"] = "port",
            ["title"] = "Port",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Proxy server port number",
          },
          {
            ["name"] = "secret",
            ["title"] = "Secret",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Secret key for proxy authentication",
          },
          {
            ["name"] = "server",
            ["title"] = "Server",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Proxy server hostname or IP address",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "proxy",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/proxies",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "proxies",
                  },
                },
                ["parts"] = {
                  "api",
                  "proxies",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
