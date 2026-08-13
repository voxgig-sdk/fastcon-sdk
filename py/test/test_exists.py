# Fastcon SDK exists test

import pytest
from fastcon_sdk import FastconSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FastconSDK.test(None, None)
        assert testsdk is not None
