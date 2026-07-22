<?php
declare(strict_types=1);

// Fastcon SDK configuration

class FastconConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Fastcon",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'server_id',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'time',
              'req' => true,
              'type' => '`$NUMBER`',
              'index$' => 2,
            ],
          ],
          'name' => 'ping',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'proxy' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'port',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'secret',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'server',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'proxy',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
