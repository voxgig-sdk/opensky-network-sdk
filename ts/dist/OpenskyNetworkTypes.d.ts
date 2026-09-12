export interface Flight {
    arrivalAirportCandidatesCount?: number;
    callsign?: string;
    departureAirportCandidatesCount?: number;
    estArrivalAirport?: string;
    estArrivalAirportHorizDistance?: number;
    estArrivalAirportVertDistance?: number;
    estDepartureAirport?: string;
    estDepartureAirportHorizDistance?: number;
    estDepartureAirportVertDistance?: number;
    firstSeen?: number;
    icao24?: string;
    lastSeen?: number;
}
export interface FlightListMatch {
    begin: number;
    end: number;
    icao24?: string;
    airport?: string;
    $action?: string;
    [action: string]: any;
}
export interface StateVector {
    states?: any[];
    time?: number;
}
export interface StateVectorListMatch {
    extended?: number;
    icao24?: any[];
    lamax?: number;
    lamin?: number;
    lomax?: number;
    lomin?: number;
    time?: number;
}
export interface Track {
    callsign?: string;
    endTime?: number;
    icao24?: string;
    path?: any[];
    startTime?: number;
}
export interface TrackListMatch {
    icao24: string;
    time: number;
}
