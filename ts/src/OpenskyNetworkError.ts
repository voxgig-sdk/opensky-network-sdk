
import { Context } from './Context'


class OpenskyNetworkError extends Error {

  isOpenskyNetworkError = true

  sdk = 'OpenskyNetwork'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenskyNetworkError
}

