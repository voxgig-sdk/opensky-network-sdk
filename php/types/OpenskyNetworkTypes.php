<?php
declare(strict_types=1);

// Typed models for the OpenskyNetwork SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Flight entity data model. */
class Flight
{
    public ?int $arrivalAirportCandidatesCount = null;
    public ?string $callsign = null;
    public ?int $departureAirportCandidatesCount = null;
    public ?string $estArrivalAirport = null;
    public ?int $estArrivalAirportHorizDistance = null;
    public ?int $estArrivalAirportVertDistance = null;
    public ?string $estDepartureAirport = null;
    public ?int $estDepartureAirportHorizDistance = null;
    public ?int $estDepartureAirportVertDistance = null;
    public ?int $firstSeen = null;
    public ?string $icao24 = null;
    public ?int $lastSeen = null;
}

/** Request payload for Flight#list. */
class FlightListMatch
{
    public ?int $arrivalAirportCandidatesCount = null;
    public ?string $callsign = null;
    public ?int $departureAirportCandidatesCount = null;
    public ?string $estArrivalAirport = null;
    public ?int $estArrivalAirportHorizDistance = null;
    public ?int $estArrivalAirportVertDistance = null;
    public ?string $estDepartureAirport = null;
    public ?int $estDepartureAirportHorizDistance = null;
    public ?int $estDepartureAirportVertDistance = null;
    public ?int $firstSeen = null;
    public ?string $icao24 = null;
    public ?int $lastSeen = null;
}

/** StateVector entity data model. */
class StateVector
{
    public ?array $states = null;
    public ?int $time = null;
}

/** Request payload for StateVector#list. */
class StateVectorListMatch
{
    public ?array $states = null;
    public ?int $time = null;
}

/** Track entity data model. */
class Track
{
    public ?string $callsign = null;
    public ?int $endTime = null;
    public ?string $icao24 = null;
    public ?array $path = null;
    public ?int $startTime = null;
}

/** Request payload for Track#list. */
class TrackListMatch
{
    public ?string $callsign = null;
    public ?int $endTime = null;
    public ?string $icao24 = null;
    public ?array $path = null;
    public ?int $startTime = null;
}

