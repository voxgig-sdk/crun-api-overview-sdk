import { CrunApiOverviewEntityBase } from '../CrunApiOverviewEntityBase';
import type { CrunApiOverviewSDK } from '../CrunApiOverviewSDK';
import type { Control } from '../types';
import type { Generate, GenerateCreateData } from '../CrunApiOverviewTypes';
declare class GenerateEntity extends CrunApiOverviewEntityBase<Generate> {
    constructor(client: CrunApiOverviewSDK, entopts: any);
    make(this: GenerateEntity): GenerateEntity;
    create(this: any, reqdata?: GenerateCreateData, ctrl?: Control): Promise<GenerateEntity>;
}
export { GenerateEntity };
