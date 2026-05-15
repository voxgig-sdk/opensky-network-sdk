# OpenskyNetwork SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenskyNetworkFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenskyNetworkBaseFeature.new
    when "test"
      OpenskyNetworkTestFeature.new
    else
      OpenskyNetworkBaseFeature.new
    end
  end
end
