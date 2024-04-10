import express from 'express'

import { CONNECT_DB, GET_DB, ClOSE_DB } from '~/config/mongodb'
import existHook from 'async-exit-hook'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3. Hello World, I am running at http://${hostname}:${port}/`)
  })

  existHook(async () => {
    console.log('4. Closing connection to MongoDb Atlas...')
    await ClOSE_DB()
    console.log('5. Close connection to MongoDb Atlas Succeed!')
  })
}

//chỉ khi connect thành công thì mới start server
// Immediately-Invoked Function Expression (IIFE)
;(async () => {
  try {
    console.log('1. Connecting to MongoDb Atlas...')
    await CONNECT_DB()
    console.log('2. Connect to MongoDb Atlas Succeed!')
    START_SERVER()
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()

// //chỉ khi connect thành công thì mới start server
// console.log('1. Connecting to MongoDb Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connect to MongoDb Atlas Succeed!'))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.error(err)
//     process.exit(0)
//   })
