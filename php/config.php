<?php
declare(strict_types=1);

// Fastcon SDK configuration

class FastconConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Fastcon",
                "slug" => "fastcon",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://fastcon.harknmav.fun",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "ping" => [],
                    "proxy" => [],
                ],
            ],
            "entity" => [
        'ping' => [
          'fields' => [
            [
              'name' => 'server_id',
              'title' => 'Server Id',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The ID of the pinged server',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
              'short' => 'Status of the ping operation',
            ],
            [
              'name' => 'time',
              'title' => 'Time',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'Ping time in milliseconds',
            ],
          ],
          'name' => 'ping',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ping',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'ping',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'ping',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'proxy' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the proxy server',
            ],
            [
              'name' => 'port',
              'title' => 'Port',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Proxy server port number',
            ],
            [
              'name' => 'secret',
              'title' => 'Secret',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Secret key for proxy authentication',
            ],
            [
              'name' => 'server',
              'title' => 'Server',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Proxy server hostname or IP address',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'proxy',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/proxies',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'proxies',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'proxies',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FastconFeatures::make_feature($name);
    }
}
