import { GenerateEntity } from './entity/GenerateEntity';
import { TaskEntity } from './entity/TaskEntity';
export type * from './CrunApiOverviewTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CrunApiOverviewEntityBase } from './CrunApiOverviewEntityBase';
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
declare class CrunApiOverviewSDK {
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
    Generate(entopts?: Record<string, any>): GenerateEntity;
    Task(entopts?: Record<string, any>): TaskEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CrunApiOverviewSDK;
    tester(testopts?: any, sdkopts?: any): CrunApiOverviewSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CrunApiOverviewSDK;
export { stdutil, config, BaseFeature, CrunApiOverviewEntityBase, CrunApiOverviewSDK, SDK, };
export type { DirectResult };
