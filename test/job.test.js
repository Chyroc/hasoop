/**
 * Created by Chyroc on 17/1/10.
 */

import { expect } from 'chai'
import { Hasoop } from '../src/index'

const sqoopClient = new Hasoop('')

suite('job', () => {
  test.skip('createJob', () => {
    sqoopClient.createJob()
  })

  test.skip('deleteJob', () => {
    sqoopClient.deleteJob()
  })

  test.skip('getJob', () => {
    sqoopClient.getJob()
  })

  test.skip('updateJob', () => {
    sqoopClient.updateJob()
  })

  test.skip('startJob', () => {
    sqoopClient.startJob()
  })

  test.skip('stopJob', () => {
    sqoopClient.stopJob()
  })
})