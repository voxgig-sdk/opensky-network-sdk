# OpenskyNetwork SDK utility: make_context

from core.context import OpenskyNetworkContext


def make_context_util(ctxmap, basectx):
    return OpenskyNetworkContext(ctxmap, basectx)
