# Fastcon SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Fastcon",
            "slug": "fastcon",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://fastcon.harknmav.fun",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ping": {},
                "proxy": {},
            },
        },
        "entity": {
      "ping": {
        "fields": [
          {
            "name": "server_id",
            "title": "Server Id",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The ID of the pinged server",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Status of the ping operation",
          },
          {
            "name": "time",
            "title": "Time",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Ping time in milliseconds",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "ping",
                  },
                ],
                "parts": [
                  "api",
                  "ping",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "proxy": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the proxy server",
          },
          {
            "name": "port",
            "title": "Port",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Proxy server port number",
          },
          {
            "name": "secret",
            "title": "Secret",
            "type": "`$STRING`",
            "req": True,
            "short": "Secret key for proxy authentication",
          },
          {
            "name": "server",
            "title": "Server",
            "type": "`$STRING`",
            "req": True,
            "short": "Proxy server hostname or IP address",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "api",
                  },
                  {
                    "lit": "proxies",
                  },
                ],
                "parts": [
                  "api",
                  "proxies",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
