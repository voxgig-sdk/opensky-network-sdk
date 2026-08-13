# OpenskyNetwork SDK utility: make_context

from projectname_sdk.core.context import OpenskyNetworkContext


def make_context_util(ctxmap, basectx):
    return OpenskyNetworkContext(ctxmap, basectx)
