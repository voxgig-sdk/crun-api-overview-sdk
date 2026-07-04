-- Typed models for the CrunApiOverview SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Generate
---@field aspect_ratio? string
---@field callback_url? string
---@field duration? number
---@field height? number
---@field image_url? string
---@field model string
---@field negative_prompt? string
---@field num_image? number
---@field prompt string
---@field status string
---@field task_id string
---@field width? number

---@class GenerateCreateData

---@class Task
---@field completed_at? string
---@field created_at string
---@field credit_consumption? number
---@field error? table
---@field input_parameter? table
---@field model string
---@field result? table
---@field status string
---@field task_id string

---@class TaskLoadMatch
---@field id string

local M = {}

return M
