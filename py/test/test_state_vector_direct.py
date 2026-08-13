# StateVector direct test

import json
import pytest

from openskynetwork_sdk.utility.voxgig_struct import voxgig_struct as vs
from openskynetwork_sdk import OpenskyNetworkSDK
from openskynetwork_sdk.core import helpers
from test import runner


class TestStateVectorDirect:

    def test_should_direct_list_state_vector(self):
        setup = _state_vector_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-state_vector", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]


        result = client.direct({
            "path": "states/all",
            "method": "GET",
            "params": {},
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if result.get("err") is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _state_vector_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "OPENSKY_NETWORK_TEST_STATE_VECTOR_ENTID": {},
        "OPENSKY_NETWORK_TEST_LIVE": "FALSE",
        "OPENSKY_NETWORK_APIKEY": "NONE",
    })

    live = env.get("OPENSKY_NETWORK_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("OPENSKY_NETWORK_APIKEY"),
        }
        client = OpenskyNetworkSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = OpenskyNetworkSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
