// Typed models for the OpenskyNetwork SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Flight {
  arrival_airport_candidates_count?: number
  callsign?: string
  departure_airport_candidates_count?: number
  est_arrival_airport?: string
  est_arrival_airport_horiz_distance?: number
  est_arrival_airport_vert_distance?: number
  est_departure_airport?: string
  est_departure_airport_horiz_distance?: number
  est_departure_airport_vert_distance?: number
  first_seen?: number
  icao24?: string
  last_seen?: number
}

export interface FlightListMatch {
  arrival_airport_candidates_count?: number
  callsign?: string
  departure_airport_candidates_count?: number
  est_arrival_airport?: string
  est_arrival_airport_horiz_distance?: number
  est_arrival_airport_vert_distance?: number
  est_departure_airport?: string
  est_departure_airport_horiz_distance?: number
  est_departure_airport_vert_distance?: number
  first_seen?: number
  icao24?: string
  last_seen?: number
}

export interface StateVector {
  state?: any[]
  time?: number
}

export interface StateVectorListMatch {
  state?: any[]
  time?: number
}

export interface Track {
  callsign?: string
  end_time?: number
  icao24?: string
  path?: any[]
  start_time?: number
}

export interface TrackListMatch {
  callsign?: string
  end_time?: number
  icao24?: string
  path?: any[]
  start_time?: number
}

