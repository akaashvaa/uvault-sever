import { User, Post } from '../model/model.js'
async function createUser(userId, res) {
  try {
    const newUser = new User({ userId })
    await newUser.save()
    // console.log('newuser created', newUser)
    res.status(201).send({ userData: [] })
  } catch (error) {
    console.error('error while creating new user row', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

async function getAllUserData(userId, res) {
  try {
    const userData = await Post.find({ userId }).sort({ createdAt: -1 })
    // console.log('get data', userData)
    res.status(201).send({
      userData,
    })
  } catch (error) {
    console.error('error whle fetching all the data api : ../getAll ', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}
// /API/V1/GETALL/:USERID
export const getUserData = async (req, res) => {
  const { userId } = req.params
  try {
    const userData = await User.findOne({ userId })

    // console.log('hit', userData)

    if (userData !== null) {
      // console.log('hello user', userId)
      await getAllUserData(userId, res)
    } else {
      console.log('if user id is not there then create new one', userId)
      await createUser(userId, res)
    }
  } catch (error) {
    console.error('error while checking if user exist or not', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

// /API/V1/POST  or creating post
export const savePost = async (req, res) => {
  const { postId, userId, title, url } = req.body

  // console.log('hello user', postId, userId, title, url)

  try {
    const post = new Post({ postId, userId, title, url })

    await post.save()

    // console.log('pushed', post._id)

    res.status(201).send({
      post,
    })
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async (req, res) => {
  const { postId } = req.params
  console.log('delete this Post id', postId)
  try {
    const deletedPost = await Post.deleteOne({ postId })
    res.status(201).send({
      msg: 'Deleted Successfully',
      deletedPost,
    })
  } catch (error) {
    console.error('error while deleting the PostId', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

export const updatePost = async (req, res) => {
  const { postId, title, url } = req.body
  console.log('update this Post id', postId)

  const filter = { postId }
  const update = {
    title,
    url,
  }

  try {
    const updatePost = await Post.updateOne(filter, update)
    res
      .status(201)
      .send({ msg: 'Successfully updated', updatedData: updatePost })
  } catch (error) {
    console.error('error while upadting the PostId', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}
