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
    public ?int $arrival_airport_candidates_count = null;
    public ?string $callsign = null;
    public ?int $departure_airport_candidates_count = null;
    public ?string $est_arrival_airport = null;
    public ?int $est_arrival_airport_horiz_distance = null;
    public ?int $est_arrival_airport_vert_distance = null;
    public ?string $est_departure_airport = null;
    public ?int $est_departure_airport_horiz_distance = null;
    public ?int $est_departure_airport_vert_distance = null;
    public ?int $first_seen = null;
    public ?string $icao24 = null;
    public ?int $last_seen = null;
}

/** Request payload for Flight#list. */
class FlightListMatch
{
    public ?int $arrival_airport_candidates_count = null;
    public ?string $callsign = null;
    public ?int $departure_airport_candidates_count = null;
    public ?string $est_arrival_airport = null;
    public ?int $est_arrival_airport_horiz_distance = null;
    public ?int $est_arrival_airport_vert_distance = null;
    public ?string $est_departure_airport = null;
    public ?int $est_departure_airport_horiz_distance = null;
    public ?int $est_departure_airport_vert_distance = null;
    public ?int $first_seen = null;
    public ?string $icao24 = null;
    public ?int $last_seen = null;
}

/** StateVector entity data model. */
class StateVector
{
    public ?array $state = null;
    public ?int $time = null;
}

/** Request payload for StateVector#list. */
class StateVectorListMatch
{
    public ?array $state = null;
    public ?int $time = null;
}

/** Track entity data model. */
class Track
{
    public ?string $callsign = null;
    public ?int $end_time = null;
    public ?string $icao24 = null;
    public ?array $path = null;
    public ?int $start_time = null;
}

/** Request payload for Track#list. */
class TrackListMatch
{
    public ?string $callsign = null;
    public ?int $end_time = null;
    public ?string $icao24 = null;
    public ?array $path = null;
    public ?int $start_time = null;
}

