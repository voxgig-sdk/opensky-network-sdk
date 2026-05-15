<?php
declare(strict_types=1);

// OpenskyNetwork SDK exists test

require_once __DIR__ . '/../openskynetwork_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenskyNetworkSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
