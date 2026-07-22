<?php
declare(strict_types=1);

// Fastcon SDK base feature

class FastconBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FastconContext $ctx, array $options): void {}
    public function PostConstruct(FastconContext $ctx): void {}
    public function PostConstructEntity(FastconContext $ctx): void {}
    public function SetData(FastconContext $ctx): void {}
    public function GetData(FastconContext $ctx): void {}
    public function GetMatch(FastconContext $ctx): void {}
    public function SetMatch(FastconContext $ctx): void {}
    public function PrePoint(FastconContext $ctx): void {}
    public function PreSpec(FastconContext $ctx): void {}
    public function PreRequest(FastconContext $ctx): void {}
    public function PreResponse(FastconContext $ctx): void {}
    public function PreResult(FastconContext $ctx): void {}
    public function PreDone(FastconContext $ctx): void {}
    public function PreUnexpected(FastconContext $ctx): void {}
}
