# CrunApiOverview SDK utility: make_context
require_relative '../core/context'
module CrunApiOverviewUtilities
  MakeContext = ->(ctxmap, basectx) {
    CrunApiOverviewContext.new(ctxmap, basectx)
  }
end
