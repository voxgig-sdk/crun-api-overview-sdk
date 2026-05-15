# CrunApiOverview SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CrunApiOverviewFeatures
  def self.make_feature(name)
    case name
    when "base"
      CrunApiOverviewBaseFeature.new
    when "test"
      CrunApiOverviewTestFeature.new
    else
      CrunApiOverviewBaseFeature.new
    end
  end
end
