import { OpenskyNetworkEntityBase } from '../OpenskyNetworkEntityBase';
import type { OpenskyNetworkSDK } from '../OpenskyNetworkSDK';
import type { Control } from '../types';
import type { Track, TrackListMatch } from '../OpenskyNetworkTypes';
declare class TrackEntity extends OpenskyNetworkEntityBase<Track> {
    constructor(client: OpenskyNetworkSDK, entopts: any);
    make(this: TrackEntity): TrackEntity;
    list(this: any, reqmatch?: TrackListMatch, ctrl?: Control): Promise<TrackEntity[]>;
}
export { TrackEntity };
