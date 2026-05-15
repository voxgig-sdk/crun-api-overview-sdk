<?php
declare(strict_types=1);

// CrunApiOverview SDK utility: result_headers

class CrunApiOverviewResultHeaders
{
    public static function call(CrunApiOverviewContext $ctx): ?CrunApiOverviewResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
