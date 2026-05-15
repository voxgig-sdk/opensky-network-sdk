# OpenskyNetwork SDK utility: make_context
require_relative '../core/context'
module OpenskyNetworkUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenskyNetworkContext.new(ctxmap, basectx)
  }
end
