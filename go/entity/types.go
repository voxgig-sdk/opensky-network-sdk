// Typed models for the OpenskyNetwork SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Flight is the typed data model for the flight entity.
type Flight struct {
	ArrivalAirportCandidatesCount *int `json:"arrival_airport_candidates_count,omitempty"`
	Callsign *string `json:"callsign,omitempty"`
	DepartureAirportCandidatesCount *int `json:"departure_airport_candidates_count,omitempty"`
	EstArrivalAirport *string `json:"est_arrival_airport,omitempty"`
	EstArrivalAirportHorizDistance *int `json:"est_arrival_airport_horiz_distance,omitempty"`
	EstArrivalAirportVertDistance *int `json:"est_arrival_airport_vert_distance,omitempty"`
	EstDepartureAirport *string `json:"est_departure_airport,omitempty"`
	EstDepartureAirportHorizDistance *int `json:"est_departure_airport_horiz_distance,omitempty"`
	EstDepartureAirportVertDistance *int `json:"est_departure_airport_vert_distance,omitempty"`
	FirstSeen *int `json:"first_seen,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	LastSeen *int `json:"last_seen,omitempty"`
}

// FlightListMatch mirrors the flight fields as an all-optional match
// filter (Go analog of Partial<Flight>).
type FlightListMatch struct {
	ArrivalAirportCandidatesCount *int `json:"arrival_airport_candidates_count,omitempty"`
	Callsign *string `json:"callsign,omitempty"`
	DepartureAirportCandidatesCount *int `json:"departure_airport_candidates_count,omitempty"`
	EstArrivalAirport *string `json:"est_arrival_airport,omitempty"`
	EstArrivalAirportHorizDistance *int `json:"est_arrival_airport_horiz_distance,omitempty"`
	EstArrivalAirportVertDistance *int `json:"est_arrival_airport_vert_distance,omitempty"`
	EstDepartureAirport *string `json:"est_departure_airport,omitempty"`
	EstDepartureAirportHorizDistance *int `json:"est_departure_airport_horiz_distance,omitempty"`
	EstDepartureAirportVertDistance *int `json:"est_departure_airport_vert_distance,omitempty"`
	FirstSeen *int `json:"first_seen,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	LastSeen *int `json:"last_seen,omitempty"`
}

// StateVector is the typed data model for the state_vector entity.
type StateVector struct {
	State *[]any `json:"state,omitempty"`
	Time *int `json:"time,omitempty"`
}

// StateVectorListMatch mirrors the state_vector fields as an all-optional match
// filter (Go analog of Partial<StateVector>).
type StateVectorListMatch struct {
	State *[]any `json:"state,omitempty"`
	Time *int `json:"time,omitempty"`
}

// Track is the typed data model for the track entity.
type Track struct {
	Callsign *string `json:"callsign,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	Path *[]any `json:"path,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
}

// TrackListMatch mirrors the track fields as an all-optional match
// filter (Go analog of Partial<Track>).
type TrackListMatch struct {
	Callsign *string `json:"callsign,omitempty"`
	EndTime *int `json:"end_time,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	Path *[]any `json:"path,omitempty"`
	StartTime *int `json:"start_time,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
