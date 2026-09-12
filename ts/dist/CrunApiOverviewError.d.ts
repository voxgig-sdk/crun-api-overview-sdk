import { Context } from './Context';
declare class CrunApiOverviewError extends Error {
    isCrunApiOverviewError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CrunApiOverviewError };
