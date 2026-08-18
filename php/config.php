<?php
declare(strict_types=1);

// CrunApiOverview SDK configuration

class CrunApiOverviewConfig
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
                "name" => "CrunApiOverview",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.crun.ai",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "generate" => [],
                    "task" => [],
                ],
            ],
            "entity" => [
        'generate' => [
          'fields' => [
            [
              'name' => 'aspect_ratio',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'callback_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'height',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'image_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'model',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'negative_prompt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'num_images',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'prompt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'task_id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'width',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'generate',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/image/generate',
                  'parts' => [
                    'image',
                    'generate',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/video/generate',
                  'parts' => [
                    'video',
                    'generate',
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
        'task' => [
          'fields' => [
            [
              'name' => 'completed_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'credit_consumption',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'error',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'input_parameters',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'model',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'results',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'task_id',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'task',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'task_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tasks/{task_id}',
                  'parts' => [
                    'tasks',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'task_id' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
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
        return CrunApiOverviewFeatures::make_feature($name);
    }
}
