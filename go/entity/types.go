// Typed models for the OpenskyNetwork SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/opensky-network-sdk/go/core"
)

// Flight is the typed data model for the flight entity.
type Flight struct {
	ArrivalAirportCandidatesCount *int `json:"arrivalAirportCandidatesCount,omitempty"`
	Callsign *string `json:"callsign,omitempty"`
	DepartureAirportCandidatesCount *int `json:"departureAirportCandidatesCount,omitempty"`
	EstArrivalAirport *string `json:"estArrivalAirport,omitempty"`
	EstArrivalAirportHorizDistance *int `json:"estArrivalAirportHorizDistance,omitempty"`
	EstArrivalAirportVertDistance *int `json:"estArrivalAirportVertDistance,omitempty"`
	EstDepartureAirport *string `json:"estDepartureAirport,omitempty"`
	EstDepartureAirportHorizDistance *int `json:"estDepartureAirportHorizDistance,omitempty"`
	EstDepartureAirportVertDistance *int `json:"estDepartureAirportVertDistance,omitempty"`
	FirstSeen *int `json:"firstSeen,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	LastSeen *int `json:"lastSeen,omitempty"`
}

// FlightListMatch is the typed request payload for Flight.ListTyped.
type FlightListMatch struct {
	Begin int `json:"begin"`
	End int `json:"end"`
	Icao24 *string `json:"icao24,omitempty"`
	Airport *string `json:"airport,omitempty"`
}

// StateVector is the typed data model for the state_vector entity.
type StateVector struct {
	States *[]any `json:"states,omitempty"`
	Time *int `json:"time,omitempty"`
}

// StateVectorListMatch is the typed request payload for StateVector.ListTyped.
type StateVectorListMatch struct {
	Extended *int `json:"extended,omitempty"`
	Icao24 *[]any `json:"icao24,omitempty"`
	Lamax *float64 `json:"lamax,omitempty"`
	Lamin *float64 `json:"lamin,omitempty"`
	Lomax *float64 `json:"lomax,omitempty"`
	Lomin *float64 `json:"lomin,omitempty"`
	Time *int `json:"time,omitempty"`
}

// Track is the typed data model for the track entity.
type Track struct {
	Callsign *string `json:"callsign,omitempty"`
	EndTime *int `json:"endTime,omitempty"`
	Icao24 *string `json:"icao24,omitempty"`
	Path *[]any `json:"path,omitempty"`
	StartTime *int `json:"startTime,omitempty"`
}

// TrackListMatch is the typed request payload for Track.ListTyped.
type TrackListMatch struct {
	Icao24 string `json:"icao24"`
	Time int `json:"time"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
