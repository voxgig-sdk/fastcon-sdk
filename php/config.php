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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The ID of the pinged server',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'Status of the ping operation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'time',
              'req' => true,
              'short' => 'Ping time in milliseconds',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'ping',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ping',
                  'parts' => [
                    'api',
                    'ping',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'short' => 'Unique identifier for the proxy server',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'port',
              'req' => true,
              'short' => 'Proxy server port number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'secret',
              'req' => true,
              'short' => 'Secret key for proxy authentication',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'server',
              'req' => true,
              'short' => 'Proxy server hostname or IP address',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'proxy',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/proxies',
                  'parts' => [
                    'api',
                    'proxies',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
