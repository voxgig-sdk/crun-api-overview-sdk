<?php
declare(strict_types=1);

// CrunApiOverview SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CrunApiOverviewMakeContext
{
    public static function call(array $ctxmap, ?CrunApiOverviewContext $basectx): CrunApiOverviewContext
    {
        return new CrunApiOverviewContext($ctxmap, $basectx);
    }
}
