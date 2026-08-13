# CrunApiOverview SDK feature factory

from crunapioverview_sdk.feature.base_feature import CrunApiOverviewBaseFeature
from crunapioverview_sdk.feature.test_feature import CrunApiOverviewTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CrunApiOverviewBaseFeature(),
        "test": lambda: CrunApiOverviewTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
