<?php
declare(strict_types=1);

// CrunApiOverview SDK utility: result_body

class CrunApiOverviewResultBody
{
    public static function call(CrunApiOverviewContext $ctx): ?CrunApiOverviewResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
