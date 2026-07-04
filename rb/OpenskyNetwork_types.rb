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
# @!attribute [rw] arrival_airport_candidates_count
#   @return [Integer, nil]
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] departure_airport_candidates_count
#   @return [Integer, nil]
#
# @!attribute [rw] est_arrival_airport
#   @return [String, nil]
#
# @!attribute [rw] est_arrival_airport_horiz_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_arrival_airport_vert_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_departure_airport
#   @return [String, nil]
#
# @!attribute [rw] est_departure_airport_horiz_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_departure_airport_vert_distance
#   @return [Integer, nil]
#
# @!attribute [rw] first_seen
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] last_seen
#   @return [Integer, nil]
Flight = Struct.new(
  :arrival_airport_candidates_count,
  :callsign,
  :departure_airport_candidates_count,
  :est_arrival_airport,
  :est_arrival_airport_horiz_distance,
  :est_arrival_airport_vert_distance,
  :est_departure_airport,
  :est_departure_airport_horiz_distance,
  :est_departure_airport_vert_distance,
  :first_seen,
  :icao24,
  :last_seen,
  keyword_init: true
)

# Match filter for Flight#list (any subset of Flight fields).
#
# @!attribute [rw] arrival_airport_candidates_count
#   @return [Integer, nil]
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] departure_airport_candidates_count
#   @return [Integer, nil]
#
# @!attribute [rw] est_arrival_airport
#   @return [String, nil]
#
# @!attribute [rw] est_arrival_airport_horiz_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_arrival_airport_vert_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_departure_airport
#   @return [String, nil]
#
# @!attribute [rw] est_departure_airport_horiz_distance
#   @return [Integer, nil]
#
# @!attribute [rw] est_departure_airport_vert_distance
#   @return [Integer, nil]
#
# @!attribute [rw] first_seen
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] last_seen
#   @return [Integer, nil]
FlightListMatch = Struct.new(
  :arrival_airport_candidates_count,
  :callsign,
  :departure_airport_candidates_count,
  :est_arrival_airport,
  :est_arrival_airport_horiz_distance,
  :est_arrival_airport_vert_distance,
  :est_departure_airport,
  :est_departure_airport_horiz_distance,
  :est_departure_airport_vert_distance,
  :first_seen,
  :icao24,
  :last_seen,
  keyword_init: true
)

# StateVector entity data model.
#
# @!attribute [rw] state
#   @return [Array, nil]
#
# @!attribute [rw] time
#   @return [Integer, nil]
StateVector = Struct.new(
  :state,
  :time,
  keyword_init: true
)

# Match filter for StateVector#list (any subset of StateVector fields).
#
# @!attribute [rw] state
#   @return [Array, nil]
#
# @!attribute [rw] time
#   @return [Integer, nil]
StateVectorListMatch = Struct.new(
  :state,
  :time,
  keyword_init: true
)

# Track entity data model.
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] end_time
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [Array, nil]
#
# @!attribute [rw] start_time
#   @return [Integer, nil]
Track = Struct.new(
  :callsign,
  :end_time,
  :icao24,
  :path,
  :start_time,
  keyword_init: true
)

# Match filter for Track#list (any subset of Track fields).
#
# @!attribute [rw] callsign
#   @return [String, nil]
#
# @!attribute [rw] end_time
#   @return [Integer, nil]
#
# @!attribute [rw] icao24
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [Array, nil]
#
# @!attribute [rw] start_time
#   @return [Integer, nil]
TrackListMatch = Struct.new(
  :callsign,
  :end_time,
  :icao24,
  :path,
  :start_time,
  keyword_init: true
)

