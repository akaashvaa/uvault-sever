import mongoose, { connect } from 'mongoose'

const createConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    // console.log('MongoDB connected Host ', connect.host)
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err)
  }
}
export default createConnection
