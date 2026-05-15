# OpenskyNetwork SDK exists test

require "minitest/autorun"
require_relative "../OpenskyNetwork_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenskyNetworkSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
