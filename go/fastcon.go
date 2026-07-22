package voxgigfastconsdk

import (
	"github.com/voxgig-sdk/fastcon-sdk/go/core"
	"github.com/voxgig-sdk/fastcon-sdk/go/entity"
	"github.com/voxgig-sdk/fastcon-sdk/go/feature"
	_ "github.com/voxgig-sdk/fastcon-sdk/go/utility"
)

// Type aliases preserve external API.
type FastconSDK = core.FastconSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FastconEntity = core.FastconEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FastconError = core.FastconError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPingEntityFunc = func(client *core.FastconSDK, entopts map[string]any) core.FastconEntity {
		return entity.NewPingEntity(client, entopts)
	}
	core.NewProxyEntityFunc = func(client *core.FastconSDK, entopts map[string]any) core.FastconEntity {
		return entity.NewProxyEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFastconSDK = core.NewFastconSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFastconSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FastconSDK  { return NewFastconSDK(nil) }
func Test() *FastconSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
