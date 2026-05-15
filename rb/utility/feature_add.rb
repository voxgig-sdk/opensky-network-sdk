# OpenskyNetwork SDK utility: feature_add
module OpenskyNetworkUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
