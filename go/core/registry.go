package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewPingEntityFunc func(client *FastconSDK, entopts map[string]any) FastconEntity

var NewProxyEntityFunc func(client *FastconSDK, entopts map[string]any) FastconEntity

