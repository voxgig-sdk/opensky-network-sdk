import { OpenskyNetworkEntityBase } from '../OpenskyNetworkEntityBase';
import type { OpenskyNetworkSDK } from '../OpenskyNetworkSDK';
import type { Control } from '../types';
import type { Flight, FlightListMatch } from '../OpenskyNetworkTypes';
declare class FlightEntity extends OpenskyNetworkEntityBase<Flight> {
    constructor(client: OpenskyNetworkSDK, entopts: any);
    make(this: FlightEntity): FlightEntity;
    list(this: any, reqmatch?: FlightListMatch, ctrl?: Control): Promise<FlightEntity[]>;
}
export { FlightEntity };
