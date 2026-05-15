<?php
declare(strict_types=1);

// CrunApiOverview SDK exists test

require_once __DIR__ . '/../crunapioverview_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CrunApiOverviewSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
