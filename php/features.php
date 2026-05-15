<?php
declare(strict_types=1);

// OpenskyNetwork SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenskyNetworkFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenskyNetworkBaseFeature();
            case "test":
                return new OpenskyNetworkTestFeature();
            default:
                return new OpenskyNetworkBaseFeature();
        }
    }
}
