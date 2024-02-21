import express from 'express'
import cors from 'cors'
import {
  savePost,
  getUserData,
  deletePost,
  updatePost,
} from './controller/index.route.js'

import mongoose from 'mongoose'

const app = express()
const port = 5000

// middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
// createConnection()

/**@abstract routes */
app.get('/', (req, res) => {
  res.send('helllo from uvault')
})

app.get('/api/v1/getAll/:userId', getUserData)

app.post('/api/v1/post', savePost)

app.put('/api/v1/update', updatePost)

app.delete('/api/v1/delete/:postId', deletePost)

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('Mongodb Connected')
    app.listen(port, () => {
      console.log(`\n My app is listening to ${port}  at ${new Date()} \n`)
    })
  })
  .catch((err) => console.error('something went wrong : ', err))
