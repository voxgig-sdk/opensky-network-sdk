
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenskyNetworkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenskyNetworkSDK.test()
    equal(testsdk instanceof OpenskyNetworkSDK, true,
      'OpenskyNetworkSDK.test() must return a client synchronously')
  })

})
