# Fastcon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FastconFeatures
  def self.make_feature(name)
    case name
    when "base"
      FastconBaseFeature.new
    when "test"
      FastconTestFeature.new
    else
      FastconBaseFeature.new
    end
  end
end
