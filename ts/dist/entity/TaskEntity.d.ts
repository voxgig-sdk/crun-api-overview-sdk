import { CrunApiOverviewEntityBase } from '../CrunApiOverviewEntityBase';
import type { CrunApiOverviewSDK } from '../CrunApiOverviewSDK';
import type { Control } from '../types';
import type { Task, TaskLoadMatch } from '../CrunApiOverviewTypes';
declare class TaskEntity extends CrunApiOverviewEntityBase<Task> {
    constructor(client: CrunApiOverviewSDK, entopts: any);
    make(this: TaskEntity): TaskEntity;
    load(this: any, reqmatch?: TaskLoadMatch, ctrl?: Control): Promise<TaskEntity>;
}
export { TaskEntity };
