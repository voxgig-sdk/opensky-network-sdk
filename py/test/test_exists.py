# ProjectName SDK exists test

import pytest
from openskynetwork_sdk import OpenskyNetworkSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenskyNetworkSDK.test(None, None)
        assert testsdk is not None
