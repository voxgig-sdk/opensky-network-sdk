-- Typed models for the OpenskyNetwork SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Flight
---@field arrivalAirportCandidatesCount? number
---@field callsign? string
---@field departureAirportCandidatesCount? number
---@field estArrivalAirport? string
---@field estArrivalAirportHorizDistance? number
---@field estArrivalAirportVertDistance? number
---@field estDepartureAirport? string
---@field estDepartureAirportHorizDistance? number
---@field estDepartureAirportVertDistance? number
---@field firstSeen? number
---@field icao24? string
---@field lastSeen? number

---@class FlightListMatch
---@field arrivalAirportCandidatesCount? number
---@field callsign? string
---@field departureAirportCandidatesCount? number
---@field estArrivalAirport? string
---@field estArrivalAirportHorizDistance? number
---@field estArrivalAirportVertDistance? number
---@field estDepartureAirport? string
---@field estDepartureAirportHorizDistance? number
---@field estDepartureAirportVertDistance? number
---@field firstSeen? number
---@field icao24? string
---@field lastSeen? number

---@class StateVector
---@field states? table
---@field time? number

---@class StateVectorListMatch
---@field states? table
---@field time? number

---@class Track
---@field callsign? string
---@field endTime? number
---@field icao24? string
---@field path? table
---@field startTime? number

---@class TrackListMatch
---@field callsign? string
---@field endTime? number
---@field icao24? string
---@field path? table
---@field startTime? number

local M = {}

return M
