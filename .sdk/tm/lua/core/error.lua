-- Fastcon SDK error

local FastconError = {}
FastconError.__index = FastconError


function FastconError.new(code, msg, ctx)
  local self = setmetatable({}, FastconError)
  self.is_sdk_error = true
  self.sdk = "Fastcon"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FastconError:error()
  return self.msg
end


function FastconError:__tostring()
  return self.msg
end


return FastconError
