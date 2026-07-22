<?php
declare(strict_types=1);

// Fastcon SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FastconMakeContext
{
    public static function call(array $ctxmap, ?FastconContext $basectx): FastconContext
    {
        return new FastconContext($ctxmap, $basectx);
    }
}
