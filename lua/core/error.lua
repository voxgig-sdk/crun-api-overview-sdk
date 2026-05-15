-- CrunApiOverview SDK error

local CrunApiOverviewError = {}
CrunApiOverviewError.__index = CrunApiOverviewError


function CrunApiOverviewError.new(code, msg, ctx)
  local self = setmetatable({}, CrunApiOverviewError)
  self.is_sdk_error = true
  self.sdk = "CrunApiOverview"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CrunApiOverviewError:error()
  return self.msg
end


function CrunApiOverviewError:__tostring()
  return self.msg
end


return CrunApiOverviewError
