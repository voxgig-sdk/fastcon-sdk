-- Typed models for the Fastcon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Ping
---@field server_id? string
---@field status? string
---@field time number

---@class PingCreateData
---@field server_id? string
---@field status? string
---@field time number

---@class Proxy
---@field id? string
---@field port number
---@field secret string
---@field server string

---@class ProxyListMatch
---@field id? string
---@field port? number
---@field secret? string
---@field server? string

local M = {}

return M
