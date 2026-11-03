# OpenskyNetwork SDK utility: prepare_body
require_relative 'media'
module OpenskyNetworkUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OpenskyNetworkUtilities.raw_body(ctx.reqdata) if OpenskyNetworkUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
