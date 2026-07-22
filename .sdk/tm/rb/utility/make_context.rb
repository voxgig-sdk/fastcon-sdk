# Fastcon SDK utility: make_context
require_relative '../core/context'
module FastconUtilities
  MakeContext = ->(ctxmap, basectx) {
    FastconContext.new(ctxmap, basectx)
  }
end
