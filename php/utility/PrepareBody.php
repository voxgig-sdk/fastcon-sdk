<?php
declare(strict_types=1);

// Fastcon SDK utility: prepare_body

class FastconPrepareBody
{
    public static function call(FastconContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
