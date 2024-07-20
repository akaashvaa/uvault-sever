import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
  savePost,
  getUserData,
  deletePost,
  updatePost,
} from './controller/index.route.js'

import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(
  cors()
)
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//   })
// )


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
