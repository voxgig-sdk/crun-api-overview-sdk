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
                "slug" => "crun-api-overview",
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
              'short' => 'Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'callback_url',
              'short' => 'Optional webhook URL to receive task completion notification',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'short' => 'Duration of the video in seconds',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'height',
              'short' => 'Height of the generated image in pixels',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'image_url',
              'short' => 'Optional reference image URL for image-to-video generation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'model',
              'req' => true,
              'short' => 'Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'negative_prompt',
              'short' => 'Text description of what to avoid in the generated image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'num_images',
              'short' => 'Number of images to generate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'prompt',
              'req' => true,
              'short' => 'Text description of the image to generate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'short' => 'Initial status of the task',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'task_id',
              'req' => true,
              'short' => 'Unique identifier for the created task.',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'width',
              'short' => 'Width of the generated image in pixels',
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
              'short' => 'Timestamp when the task was completed (if applicable)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'req' => true,
              'short' => 'Timestamp when the task was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'credit_consumption',
              'short' => 'Number of credits consumed by this task',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'error',
              'short' => 'Error details if the task failed',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'input_parameters',
              'short' => 'The input parameters used to create the task',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'model',
              'req' => true,
              'short' => 'Name of the AI model used for this task',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'results',
              'short' => 'Generated media files or output data.',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'short' => 'Current status of the task',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'task_id',
              'req' => true,
              'short' => 'Unique identifier of the task',
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
