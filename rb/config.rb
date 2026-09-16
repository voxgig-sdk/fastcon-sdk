# Fastcon SDK configuration

module FastconConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Fastcon",
        "slug" => "fastcon",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://fastcon.harknmav.fun",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "ping" => {},
          "proxy" => {},
        },
      },
      "entity" => {
        "ping" => {
          "fields" => [
            {
              "name" => "server_id",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "The ID of the pinged server",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "short" => "Status of the ping operation",
              "type" => "`$STRING`",
            },
            {
              "name" => "time",
              "req" => true,
              "short" => "Ping time in milliseconds",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "ping",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ping",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ping",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "ping",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "proxy" => {
          "fields" => [
            {
              "name" => "id",
              "short" => "Unique identifier for the proxy server",
              "type" => "`$STRING`",
            },
            {
              "name" => "port",
              "req" => true,
              "short" => "Proxy server port number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "secret",
              "req" => true,
              "short" => "Secret key for proxy authentication",
              "type" => "`$STRING`",
            },
            {
              "name" => "server",
              "req" => true,
              "short" => "Proxy server hostname or IP address",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "proxy",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/proxies",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "proxies",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "proxies",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FastconFeatures.make_feature(name)
  end
end
