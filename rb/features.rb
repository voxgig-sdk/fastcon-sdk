# Fastcon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FastconFeatures
  def self.make_feature(name)
    case name
    when "base"
      FastconBaseFeature.new
    when "ratelimit"
      FastconRatelimitFeature.new
    when "retry"
      FastconRetryFeature.new
    when "test"
      FastconTestFeature.new
    when "timeout"
      FastconTimeoutFeature.new
    else
      FastconBaseFeature.new
    end
  end
end
