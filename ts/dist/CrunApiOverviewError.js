"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrunApiOverviewError = void 0;
class CrunApiOverviewError extends Error {
    isCrunApiOverviewError = true;
    sdk = 'CrunApiOverview';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CrunApiOverviewError = CrunApiOverviewError;
//# sourceMappingURL=CrunApiOverviewError.js.map