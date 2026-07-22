<?php
declare(strict_types=1);

// Typed models for the Fastcon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Ping entity data model. */
class Ping
{
    public ?string $server_id = null;
    public ?string $status = null;
    public float $time;
}

/** Request payload for Ping#create. */
class PingCreateData
{
    public ?string $server_id = null;
    public ?string $status = null;
    public float $time;
}

/** Proxy entity data model. */
class Proxy
{
    public ?string $id = null;
    public int $port;
    public string $secret;
    public string $server;
}

/** Request payload for Proxy#list. */
class ProxyListMatch
{
    public ?string $id = null;
    public ?int $port = null;
    public ?string $secret = null;
    public ?string $server = null;
}

