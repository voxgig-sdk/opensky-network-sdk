-- OpenskyNetwork SDK exists test

local sdk = require("opensky-network_sdk")

describe("OpenskyNetworkSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
