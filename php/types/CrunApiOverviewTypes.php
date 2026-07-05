<?php
declare(strict_types=1);

// Typed models for the CrunApiOverview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Generate entity data model. */
class Generate
{
    public ?string $aspect_ratio = null;
    public ?string $callback_url = null;
    public ?float $duration = null;
    public ?int $height = null;
    public ?string $image_url = null;
    public string $model;
    public ?string $negative_prompt = null;
    public ?int $num_image = null;
    public string $prompt;
    public string $status;
    public string $task_id;
    public ?int $width = null;
}

/** Request payload for Generate#create. */
class GenerateCreateData
{
    public ?string $aspect_ratio = null;
    public ?string $callback_url = null;
    public ?float $duration = null;
    public ?int $height = null;
    public ?string $image_url = null;
    public string $model;
    public ?string $negative_prompt = null;
    public ?int $num_image = null;
    public string $prompt;
    public string $status;
    public string $task_id;
    public ?int $width = null;
}

/** Task entity data model. */
class Task
{
    public ?string $completed_at = null;
    public string $created_at;
    public ?float $credit_consumption = null;
    public ?array $error = null;
    public ?array $input_parameter = null;
    public string $model;
    public ?array $result = null;
    public string $status;
    public string $task_id;
}

/** Request payload for Task#load. */
class TaskLoadMatch
{
    public string $id;
}

