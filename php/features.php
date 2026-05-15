<?php
declare(strict_types=1);

// CrunApiOverview SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CrunApiOverviewFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CrunApiOverviewBaseFeature();
            case "test":
                return new CrunApiOverviewTestFeature();
            default:
                return new CrunApiOverviewBaseFeature();
        }
    }
}
