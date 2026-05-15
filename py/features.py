# OpenskyNetwork SDK feature factory

from feature.base_feature import OpenskyNetworkBaseFeature
from feature.test_feature import OpenskyNetworkTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenskyNetworkBaseFeature(),
        "test": lambda: OpenskyNetworkTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
