
import { Context } from './Context'


class FastconError extends Error {

  isFastconError = true

  sdk = 'Fastcon'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FastconError
}

