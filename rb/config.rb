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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
            {
              "name" => "time",
              "req" => true,
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
                  "parts" => [
                    "api",
                    "ping",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "port",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "secret",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "server",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "proxies",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
