<?php
declare(strict_types=1);

// Fastcon SDK utility: result_body

class FastconResultBody
{
    public static function call(FastconContext $ctx): ?FastconResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
