package voxgigcrunapioverviewsdk

import (
	"github.com/voxgig-sdk/crun-api-overview-sdk/go/core"
	"github.com/voxgig-sdk/crun-api-overview-sdk/go/entity"
	"github.com/voxgig-sdk/crun-api-overview-sdk/go/feature"
	_ "github.com/voxgig-sdk/crun-api-overview-sdk/go/utility"
)

// Type aliases preserve external API.
type CrunApiOverviewSDK = core.CrunApiOverviewSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CrunApiOverviewEntity = core.CrunApiOverviewEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CrunApiOverviewError = core.CrunApiOverviewError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGenerateEntityFunc = func(client *core.CrunApiOverviewSDK, entopts map[string]any) core.CrunApiOverviewEntity {
		return entity.NewGenerateEntity(client, entopts)
	}
	core.NewTaskEntityFunc = func(client *core.CrunApiOverviewSDK, entopts map[string]any) core.CrunApiOverviewEntity {
		return entity.NewTaskEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCrunApiOverviewSDK = core.NewCrunApiOverviewSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
