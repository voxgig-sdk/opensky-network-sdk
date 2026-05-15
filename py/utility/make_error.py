# OpenskyNetwork SDK utility: make_error

from __future__ import annotations
from core.operation import OpenskyNetworkOperation
from core.result import OpenskyNetworkResult
from core.control import OpenskyNetworkControl
from core.error import OpenskyNetworkError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import OpenskyNetworkContext
        ctx = OpenskyNetworkContext({}, None)

    op = ctx.op
    if op is None:
        op = OpenskyNetworkOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = OpenskyNetworkResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, OpenskyNetworkError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "OpenskyNetworkSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = OpenskyNetworkError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, OpenskyNetworkError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata, None

    return None, sdk_err
