package voxgigopenskynetworksdk

import (
	"github.com/voxgig-sdk/opensky-network-sdk/go/core"
	"github.com/voxgig-sdk/opensky-network-sdk/go/entity"
	"github.com/voxgig-sdk/opensky-network-sdk/go/feature"
	_ "github.com/voxgig-sdk/opensky-network-sdk/go/utility"
)

// Type aliases preserve external API.
type OpenskyNetworkSDK = core.OpenskyNetworkSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenskyNetworkEntity = core.OpenskyNetworkEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenskyNetworkError = core.OpenskyNetworkError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFlightEntityFunc = func(client *core.OpenskyNetworkSDK, entopts map[string]any) core.OpenskyNetworkEntity {
		return entity.NewFlightEntity(client, entopts)
	}
	core.NewStateVectorEntityFunc = func(client *core.OpenskyNetworkSDK, entopts map[string]any) core.OpenskyNetworkEntity {
		return entity.NewStateVectorEntity(client, entopts)
	}
	core.NewTrackEntityFunc = func(client *core.OpenskyNetworkSDK, entopts map[string]any) core.OpenskyNetworkEntity {
		return entity.NewTrackEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenskyNetworkSDK = core.NewOpenskyNetworkSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
