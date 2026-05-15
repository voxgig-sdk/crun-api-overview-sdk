# ProjectName SDK exists test

import pytest
from crunapioverview_sdk import CrunApiOverviewSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CrunApiOverviewSDK.test(None, None)
        assert testsdk is not None
