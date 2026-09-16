# OpenskyNetwork SDK feature factory

from openskynetwork_sdk.feature.base_feature import OpenskyNetworkBaseFeature
from openskynetwork_sdk.feature.ratelimit_feature import OpenskyNetworkRatelimitFeature
from openskynetwork_sdk.feature.retry_feature import OpenskyNetworkRetryFeature
from openskynetwork_sdk.feature.test_feature import OpenskyNetworkTestFeature
from openskynetwork_sdk.feature.timeout_feature import OpenskyNetworkTimeoutFeature


_FEATURES = {
    "base": lambda: OpenskyNetworkBaseFeature(),
    "ratelimit": lambda: OpenskyNetworkRatelimitFeature(),
    "retry": lambda: OpenskyNetworkRetryFeature(),
    "test": lambda: OpenskyNetworkTestFeature(),
    "timeout": lambda: OpenskyNetworkTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
