// Typed models for the OpenskyNetwork SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Flight {
  arrivalAirportCandidatesCount?: number
  callsign?: string
  departureAirportCandidatesCount?: number
  estArrivalAirport?: string
  estArrivalAirportHorizDistance?: number
  estArrivalAirportVertDistance?: number
  estDepartureAirport?: string
  estDepartureAirportHorizDistance?: number
  estDepartureAirportVertDistance?: number
  firstSeen?: number
  icao24?: string
  lastSeen?: number
}

export interface FlightListMatch {
  arrivalAirportCandidatesCount?: number
  callsign?: string
  departureAirportCandidatesCount?: number
  estArrivalAirport?: string
  estArrivalAirportHorizDistance?: number
  estArrivalAirportVertDistance?: number
  estDepartureAirport?: string
  estDepartureAirportHorizDistance?: number
  estDepartureAirportVertDistance?: number
  firstSeen?: number
  icao24?: string
  lastSeen?: number

  // Selects a custom action instead of the plain list:
  //   'aircraft' | 'all' | 'arrival' | 'departure'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StateVector {
  states?: any[]
  time?: number
}

export interface StateVectorListMatch {
  states?: any[]
  time?: number
}

export interface Track {
  callsign?: string
  endTime?: number
  icao24?: string
  path?: any[]
  startTime?: number
}

export interface TrackListMatch {
  callsign?: string
  endTime?: number
  icao24?: string
  path?: any[]
  startTime?: number
}

