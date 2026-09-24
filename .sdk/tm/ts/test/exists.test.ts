
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CrunApiOverviewSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CrunApiOverviewSDK.test()
    equal(testsdk instanceof CrunApiOverviewSDK, true,
      'CrunApiOverviewSDK.test() must return a client synchronously')
  })

})
