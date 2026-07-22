-- Fastcon SDK exists test

local sdk = require("fastcon_sdk")

describe("FastconSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
