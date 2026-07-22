<?php
declare(strict_types=1);

// Fastcon SDK exists test

require_once __DIR__ . '/../fastcon_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FastconSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
