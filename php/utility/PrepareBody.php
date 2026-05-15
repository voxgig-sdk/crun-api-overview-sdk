<?php
declare(strict_types=1);

// CrunApiOverview SDK utility: prepare_body

class CrunApiOverviewPrepareBody
{
    public static function call(CrunApiOverviewContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
