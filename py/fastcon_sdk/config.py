# Fastcon SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The ID of the pinged server",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "short": "Status of the ping operation",
            "type": "`$STRING`",
          },
          {
            "name": "time",
            "req": True,
            "short": "Ping time in milliseconds",
            "type": "`$NUMBER`",
          },
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
                  "ping",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "short": "Unique identifier for the proxy server",
            "type": "`$STRING`",
          },
          {
            "name": "port",
            "req": True,
            "short": "Proxy server port number",
            "type": "`$INTEGER`",
          },
          {
            "name": "secret",
            "req": True,
            "short": "Secret key for proxy authentication",
            "type": "`$STRING`",
          },
          {
            "name": "server",
            "req": True,
            "short": "Proxy server hostname or IP address",
            "type": "`$STRING`",
          },
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
                  "proxies",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
