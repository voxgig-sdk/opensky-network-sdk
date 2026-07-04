# Typed models for the OpenskyNetwork SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Flight(TypedDict, total=False):
    arrival_airport_candidates_count: int
    callsign: str
    departure_airport_candidates_count: int
    est_arrival_airport: str
    est_arrival_airport_horiz_distance: int
    est_arrival_airport_vert_distance: int
    est_departure_airport: str
    est_departure_airport_horiz_distance: int
    est_departure_airport_vert_distance: int
    first_seen: int
    icao24: str
    last_seen: int


class FlightListMatch(TypedDict, total=False):
    arrival_airport_candidates_count: int
    callsign: str
    departure_airport_candidates_count: int
    est_arrival_airport: str
    est_arrival_airport_horiz_distance: int
    est_arrival_airport_vert_distance: int
    est_departure_airport: str
    est_departure_airport_horiz_distance: int
    est_departure_airport_vert_distance: int
    first_seen: int
    icao24: str
    last_seen: int


class StateVector(TypedDict, total=False):
    state: list
    time: int


class StateVectorListMatch(TypedDict, total=False):
    state: list
    time: int


class Track(TypedDict, total=False):
    callsign: str
    end_time: int
    icao24: str
    path: list
    start_time: int


class TrackListMatch(TypedDict, total=False):
    callsign: str
    end_time: int
    icao24: str
    path: list
    start_time: int
