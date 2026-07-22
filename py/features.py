# Fastcon SDK feature factory

from feature.base_feature import FastconBaseFeature
from feature.test_feature import FastconTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FastconBaseFeature(),
        "test": lambda: FastconTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
