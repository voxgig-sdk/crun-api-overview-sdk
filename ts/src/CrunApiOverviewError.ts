
import { Context } from './Context'


class CrunApiOverviewError extends Error {

  isCrunApiOverviewError = true

  sdk = 'CrunApiOverview'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CrunApiOverviewError
}

