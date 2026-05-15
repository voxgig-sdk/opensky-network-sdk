package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewFlightEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntity

var NewStateVectorEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntity

var NewTrackEntityFunc func(client *OpenskyNetworkSDK, entopts map[string]any) OpenskyNetworkEntity

