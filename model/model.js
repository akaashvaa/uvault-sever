import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, 'User ID is required'],
    },
  },
  { timestamps: true }
)

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      unique: true,
      required: [true, 'ID is required'],
    },
    userId: {
      type: String,
      required: [true, 'User ID for  is required for post'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
    },
  },
  { timestamps: true }
)

//  lets export the models
export const User = mongoose.model('User', userSchema)

export const Post = mongoose.model('Post', postSchema)
