# Fastcon SDK feature factory

from fastcon_sdk.feature.base_feature import FastconBaseFeature
from fastcon_sdk.feature.ratelimit_feature import FastconRatelimitFeature
from fastcon_sdk.feature.retry_feature import FastconRetryFeature
from fastcon_sdk.feature.test_feature import FastconTestFeature
from fastcon_sdk.feature.timeout_feature import FastconTimeoutFeature


_FEATURES = {
    "base": lambda: FastconBaseFeature(),
    "ratelimit": lambda: FastconRatelimitFeature(),
    "retry": lambda: FastconRetryFeature(),
    "test": lambda: FastconTestFeature(),
    "timeout": lambda: FastconTimeoutFeature(),
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
