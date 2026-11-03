import { FlightEntity } from './entity/FlightEntity';
import { OwnEntity } from './entity/OwnEntity';
import { StateVectorEntity } from './entity/StateVectorEntity';
import { TrackEntity } from './entity/TrackEntity';
export type * from './OpenskyNetworkTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpenskyNetworkEntityBase } from './OpenskyNetworkEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class OpenskyNetworkSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Flight(entopts?: Record<string, any>): FlightEntity;
    Own(entopts?: Record<string, any>): OwnEntity;
    StateVector(entopts?: Record<string, any>): StateVectorEntity;
    Track(entopts?: Record<string, any>): TrackEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpenskyNetworkSDK;
    tester(testopts?: any, sdkopts?: any): OpenskyNetworkSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpenskyNetworkSDK;
export { stdutil, config, BaseFeature, OpenskyNetworkEntityBase, OpenskyNetworkSDK, SDK, };
export type { DirectResult };
