-- OpenskyNetwork SDK error

local OpenskyNetworkError = {}
OpenskyNetworkError.__index = OpenskyNetworkError


function OpenskyNetworkError.new(code, msg, ctx)
  local self = setmetatable({}, OpenskyNetworkError)
  self.is_sdk_error = true
  self.sdk = "OpenskyNetwork"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenskyNetworkError:error()
  return self.msg
end


function OpenskyNetworkError:__tostring()
  return self.msg
end


return OpenskyNetworkError
