package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGenerateEntityFunc func(client *CrunApiOverviewSDK, entopts map[string]any) CrunApiOverviewEntity

var NewTaskEntityFunc func(client *CrunApiOverviewSDK, entopts map[string]any) CrunApiOverviewEntity

