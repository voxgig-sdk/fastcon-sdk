# Fastcon SDK exists test

require "minitest/autorun"
require_relative "../Fastcon_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FastconSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
