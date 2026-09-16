# CrunApiOverview SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CrunApiOverviewFeatures
  def self.make_feature(name)
    case name
    when "base"
      CrunApiOverviewBaseFeature.new
    when "ratelimit"
      CrunApiOverviewRatelimitFeature.new
    when "retry"
      CrunApiOverviewRetryFeature.new
    when "test"
      CrunApiOverviewTestFeature.new
    when "timeout"
      CrunApiOverviewTimeoutFeature.new
    else
      CrunApiOverviewBaseFeature.new
    end
  end
end
