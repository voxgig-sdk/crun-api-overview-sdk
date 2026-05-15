
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CrunApiOverviewSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CrunApiOverviewSDK.test()
    equal(null !== testsdk, true)
  })

})
