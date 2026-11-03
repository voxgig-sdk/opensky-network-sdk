package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewFlightEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntityBase

var NewOwnEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntityBase

var NewStateVectorEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntityBase

var NewTrackEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntityBase

