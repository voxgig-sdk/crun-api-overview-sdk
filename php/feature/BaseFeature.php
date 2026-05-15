<?php
declare(strict_types=1);

// CrunApiOverview SDK base feature

class CrunApiOverviewBaseFeature
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

    public function init(CrunApiOverviewContext $ctx, array $options): void {}
    public function PostConstruct(CrunApiOverviewContext $ctx): void {}
    public function PostConstructEntity(CrunApiOverviewContext $ctx): void {}
    public function SetData(CrunApiOverviewContext $ctx): void {}
    public function GetData(CrunApiOverviewContext $ctx): void {}
    public function GetMatch(CrunApiOverviewContext $ctx): void {}
    public function SetMatch(CrunApiOverviewContext $ctx): void {}
    public function PrePoint(CrunApiOverviewContext $ctx): void {}
    public function PreSpec(CrunApiOverviewContext $ctx): void {}
    public function PreRequest(CrunApiOverviewContext $ctx): void {}
    public function PreResponse(CrunApiOverviewContext $ctx): void {}
    public function PreResult(CrunApiOverviewContext $ctx): void {}
    public function PreDone(CrunApiOverviewContext $ctx): void {}
    public function PreUnexpected(CrunApiOverviewContext $ctx): void {}
}
