# OpenskyNetwork SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenskyNetworkFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenskyNetworkBaseFeature.new
    when "ratelimit"
      OpenskyNetworkRatelimitFeature.new
    when "retry"
      OpenskyNetworkRetryFeature.new
    when "test"
      OpenskyNetworkTestFeature.new
    when "timeout"
      OpenskyNetworkTimeoutFeature.new
    else
      OpenskyNetworkBaseFeature.new
    end
  end
end
