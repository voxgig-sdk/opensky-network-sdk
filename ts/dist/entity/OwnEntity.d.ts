import { OpenskyNetworkEntityBase } from '../OpenskyNetworkEntityBase';
import type { OpenskyNetworkSDK } from '../OpenskyNetworkSDK';
import type { Control } from '../types';
import type { Own, OwnListMatch } from '../OpenskyNetworkTypes';
declare class OwnEntity extends OpenskyNetworkEntityBase<Own> {
    constructor(client: OpenskyNetworkSDK, entopts: any);
    make(this: OwnEntity): OwnEntity;
    list(this: any, reqmatch?: OwnListMatch, ctrl?: Control): Promise<OwnEntity[]>;
}
export { OwnEntity };
