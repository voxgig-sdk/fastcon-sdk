<?php
declare(strict_types=1);

// Fastcon SDK utility: result_headers

class FastconResultHeaders
{
    public static function call(FastconContext $ctx): ?FastconResult
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
