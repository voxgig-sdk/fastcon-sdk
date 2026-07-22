<?php
declare(strict_types=1);

// Fastcon SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FastconFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FastconBaseFeature();
            case "test":
                return new FastconTestFeature();
            default:
                return new FastconBaseFeature();
        }
    }
}
