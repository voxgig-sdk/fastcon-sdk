
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FastconSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FastconSDK.test()
    equal(testsdk instanceof FastconSDK, true,
      'FastconSDK.test() must return a client synchronously')
  })

})
