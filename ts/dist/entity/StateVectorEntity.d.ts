import { OpenskyNetworkEntityBase } from '../OpenskyNetworkEntityBase';
import type { OpenskyNetworkSDK } from '../OpenskyNetworkSDK';
import type { Control } from '../types';
import type { StateVector, StateVectorListMatch } from '../OpenskyNetworkTypes';
declare class StateVectorEntity extends OpenskyNetworkEntityBase<StateVector> {
    constructor(client: OpenskyNetworkSDK, entopts: any);
    make(this: StateVectorEntity): StateVectorEntity;
    list(this: any, reqmatch?: StateVectorListMatch, ctrl?: Control): Promise<StateVectorEntity[]>;
}
export { StateVectorEntity };
