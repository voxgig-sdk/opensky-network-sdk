<?php
declare(strict_types=1);

// OpenskyNetwork SDK base feature

class OpenskyNetworkBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenskyNetworkContext $ctx, array $options): void {}
    public function PostConstruct(OpenskyNetworkContext $ctx): void {}
    public function PostConstructEntity(OpenskyNetworkContext $ctx): void {}
    public function SetData(OpenskyNetworkContext $ctx): void {}
    public function GetData(OpenskyNetworkContext $ctx): void {}
    public function GetMatch(OpenskyNetworkContext $ctx): void {}
    public function SetMatch(OpenskyNetworkContext $ctx): void {}
    public function PrePoint(OpenskyNetworkContext $ctx): void {}
    public function PreSpec(OpenskyNetworkContext $ctx): void {}
    public function PreRequest(OpenskyNetworkContext $ctx): void {}
    public function PreResponse(OpenskyNetworkContext $ctx): void {}
    public function PreResult(OpenskyNetworkContext $ctx): void {}
    public function PreDone(OpenskyNetworkContext $ctx): void {}
    public function PreUnexpected(OpenskyNetworkContext $ctx): void {}
}
