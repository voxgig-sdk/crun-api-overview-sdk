<?php
declare(strict_types=1);

// CrunApiOverview SDK utility: feature_add

class CrunApiOverviewFeatureAdd
{
    public static function call(CrunApiOverviewContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
