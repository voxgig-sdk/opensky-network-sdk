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
    arrivalAirportCandidatesCount: int
    callsign: str
    departureAirportCandidatesCount: int
    estArrivalAirport: str
    estArrivalAirportHorizDistance: int
    estArrivalAirportVertDistance: int
    estDepartureAirport: str
    estDepartureAirportHorizDistance: int
    estDepartureAirportVertDistance: int
    firstSeen: int
    icao24: str
    lastSeen: int


class FlightListMatchRequired(TypedDict):
    begin: int
    end: int


class FlightListMatch(FlightListMatchRequired, total=False):
    icao24: str
    airport: str


class StateVector(TypedDict, total=False):
    states: list
    time: int


class StateVectorListMatch(TypedDict, total=False):
    extended: int
    icao24: list
    lamax: float
    lamin: float
    lomax: float
    lomin: float
    time: int


class Track(TypedDict, total=False):
    callsign: str
    endTime: int
    icao24: str
    path: list
    startTime: int


class TrackListMatch(TypedDict):
    icao24: str
    time: int
