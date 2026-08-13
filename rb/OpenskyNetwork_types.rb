# frozen_string_literal: true

# Typed models for the OpenskyNetwork SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Flight entity data model.
#
# @!attribute [rw] arrivalAirportCandidatesCount
#   @return [Integer, nil]
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] departureAirportCandidatesCount
#   @return [Integer, nil]
#
# @!attribute [rw] estArrivalAirport
#   @return [String, nil]
#
# @!attribute [rw] estArrivalAirportHorizDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estArrivalAirportVertDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estDepartureAirport
#   @return [String, nil]
#
# @!attribute [rw] estDepartureAirportHorizDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estDepartureAirportVertDistance
#   @return [Integer, nil]
#
# @!attribute [rw] firstSeen
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] lastSeen
#   @return [Integer, nil]
Flight = Struct.new(
  :arrivalAirportCandidatesCount,
  :callsign,
  :departureAirportCandidatesCount,
  :estArrivalAirport,
  :estArrivalAirportHorizDistance,
  :estArrivalAirportVertDistance,
  :estDepartureAirport,
  :estDepartureAirportHorizDistance,
  :estDepartureAirportVertDistance,
  :firstSeen,
  :icao24,
  :lastSeen,
  keyword_init: true
)

# Request payload for Flight#list.
#
# @!attribute [rw] arrivalAirportCandidatesCount
#   @return [Integer, nil]
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] departureAirportCandidatesCount
#   @return [Integer, nil]
#
# @!attribute [rw] estArrivalAirport
#   @return [String, nil]
#
# @!attribute [rw] estArrivalAirportHorizDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estArrivalAirportVertDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estDepartureAirport
#   @return [String, nil]
#
# @!attribute [rw] estDepartureAirportHorizDistance
#   @return [Integer, nil]
#
# @!attribute [rw] estDepartureAirportVertDistance
#   @return [Integer, nil]
#
# @!attribute [rw] firstSeen
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] lastSeen
#   @return [Integer, nil]
FlightListMatch = Struct.new(
  :arrivalAirportCandidatesCount,
  :callsign,
  :departureAirportCandidatesCount,
  :estArrivalAirport,
  :estArrivalAirportHorizDistance,
  :estArrivalAirportVertDistance,
  :estDepartureAirport,
  :estDepartureAirportHorizDistance,
  :estDepartureAirportVertDistance,
  :firstSeen,
  :icao24,
  :lastSeen,
  keyword_init: true
)

# StateVector entity data model.
#
# @!attribute [rw] states
#   @return [Array, nil]
#
# @!attribute [rw] time
#   @return [Integer, nil]
StateVector = Struct.new(
  :states,
  :time,
  keyword_init: true
)

# Request payload for StateVector#list.
#
# @!attribute [rw] states
#   @return [Array, nil]
#
# @!attribute [rw] time
#   @return [Integer, nil]
StateVectorListMatch = Struct.new(
  :states,
  :time,
  keyword_init: true
)

# Track entity data model.
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] endTime
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [Array, nil]
#
# @!attribute [rw] startTime
#   @return [Integer, nil]
Track = Struct.new(
  :callsign,
  :endTime,
  :icao24,
  :path,
  :startTime,
  keyword_init: true
)

# Request payload for Track#list.
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] endTime
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [Array, nil]
#
# @!attribute [rw] startTime
#   @return [Integer, nil]
TrackListMatch = Struct.new(
  :callsign,
  :endTime,
  :icao24,
  :path,
  :startTime,
  keyword_init: true
)

