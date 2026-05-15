# CrunApiOverview SDK utility: feature_add
module CrunApiOverviewUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
