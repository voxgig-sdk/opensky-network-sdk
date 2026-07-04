# Typed models for the OpenskyNetwork SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Flight:
    arrival_airport_candidates_count: Optional[int] = None
    callsign: Optional[str] = None
    departure_airport_candidates_count: Optional[int] = None
    est_arrival_airport: Optional[str] = None
    est_arrival_airport_horiz_distance: Optional[int] = None
    est_arrival_airport_vert_distance: Optional[int] = None
    est_departure_airport: Optional[str] = None
    est_departure_airport_horiz_distance: Optional[int] = None
    est_departure_airport_vert_distance: Optional[int] = None
    first_seen: Optional[int] = None
    icao24: Optional[str] = None
    last_seen: Optional[int] = None


@dataclass
class FlightListMatch:
    arrival_airport_candidates_count: Optional[int] = None
    callsign: Optional[str] = None
    departure_airport_candidates_count: Optional[int] = None
    est_arrival_airport: Optional[str] = None
    est_arrival_airport_horiz_distance: Optional[int] = None
    est_arrival_airport_vert_distance: Optional[int] = None
    est_departure_airport: Optional[str] = None
    est_departure_airport_horiz_distance: Optional[int] = None
    est_departure_airport_vert_distance: Optional[int] = None
    first_seen: Optional[int] = None
    icao24: Optional[str] = None
    last_seen: Optional[int] = None


@dataclass
class StateVector:
    state: Optional[list] = None
    time: Optional[int] = None


@dataclass
class StateVectorListMatch:
    state: Optional[list] = None
    time: Optional[int] = None


@dataclass
class Track:
    callsign: Optional[str] = None
    end_time: Optional[int] = None
    icao24: Optional[str] = None
    path: Optional[list] = None
    start_time: Optional[int] = None


@dataclass
class TrackListMatch:
    callsign: Optional[str] = None
    end_time: Optional[int] = None
    icao24: Optional[str] = None
    path: Optional[list] = None
    start_time: Optional[int] = None

