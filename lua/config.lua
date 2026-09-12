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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The ID of the pinged server",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Status of the ping operation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "time",
            ["req"] = true,
            ["short"] = "Ping time in milliseconds",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "ping",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ping",
                },
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
            ["short"] = "Unique identifier for the proxy server",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "port",
            ["req"] = true,
            ["short"] = "Proxy server port number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "secret",
            ["req"] = true,
            ["short"] = "Secret key for proxy authentication",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "server",
            ["req"] = true,
            ["short"] = "Proxy server hostname or IP address",
            ["type"] = "`$STRING`",
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
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "proxies",
                },
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
