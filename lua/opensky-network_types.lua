-- Typed models for the OpenskyNetwork SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Flight
---@field arrival_airport_candidates_count? number
---@field callsign? string
---@field departure_airport_candidates_count? number
---@field est_arrival_airport? string
---@field est_arrival_airport_horiz_distance? number
---@field est_arrival_airport_vert_distance? number
---@field est_departure_airport? string
---@field est_departure_airport_horiz_distance? number
---@field est_departure_airport_vert_distance? number
---@field first_seen? number
---@field icao24? string
---@field last_seen? number

---@class FlightListMatch

---@class StateVector
---@field state? table
---@field time? number

---@class StateVectorListMatch

---@class Track
---@field callsign? string
---@field end_time? number
---@field icao24? string
---@field path? table
---@field start_time? number

---@class TrackListMatch

local M = {}

return M
