const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const Post = require("../../models/Post")
const auth = require('../../middleware/auth')
const { postValidate, validationResult } = require("../../validations/post/post-update-validator.js")
const { commentValidate } = require("../../validations/post/comment-validator.js")

// @route   POST api/posts
// @desc    Save posts
// @access  Public
router.post('/', [postValidate, auth], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    const post = await newPost.save()

    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error!")
  }
  res.send()
})


// @route   GET api/posts
// @desc    get posts
// @access  Private
router.get('/', auth, async (req, res) => {

  try {
    const post = await Post.find().sort({ date: -1 })

    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error!")
  }
  res.send()
})

// @route   GET api/posts
// @desc    get posts by ID
// @access  Private
router.get('/post/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id)
    if (!post) return res.status(404).json({ msg: "post not found!" })
    res.json(post)
  } catch (err) {
    console.log(err.message)
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "post not found!" })
    res.status(500).send("Server Error!")
  }
  res.send()
})

// @route   DELETE api/posts/post/:post_id
// @desc    delete posts by ID
// @access  Private
router.delete('/post/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id)

    // check if post does not exist or not by the user
    if (!post) return res.status(404).json({ msg: "post not found!" })
    if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: "User not authorized!" })

    const removed = await post.remove()

    res.json({ removed })
  } catch (err) {
    console.log(err.message)
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "post not found!" })
    res.status(500).send("Server Error!")
  }
  res.send()
})


// @route   PUT api/posts/like/:id
// @desc    update post likes by id
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id)

    // check if post does not exist or not by the user
    if (!post) return res.status(404).json({ msg: "post not found!" })

    const liked = post.likes.filter(like => like.user.toString() === req.user.id)

    // unlike if already liked or like if not
    if (liked.length > 0) {
      post.likes = post.likes.filter(like => like.user.toString() === req.user.id ? false : true)
      console.log(post.likes)
    } else {
      post.likes.unshift({ user: req.user.id })
    }

    await post.save()

    res.json(post.likes)

  } catch (err) {

    console.log(err.message)
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "post not found!" })
    res.status(500).send("Server Error!")

  }
  res.send()
})


// @route   POST api/posts/comment/:id
// @desc    Save post comment
// @access  Private
router.post('/comment/:post_id', [commentValidate, auth], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    let post = await Post.findById(req.params.post_id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment)
    post = await post.save()

    res.json(post.comments)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error!")
  }
})


// @route   DELETE api/posts/comment/:comment_id
// @desc    Delete post comemnt
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {

  try {
    let post = await Post.findById(req.params.post_id)

    // check if post does not exist or not by the user
    if (!post) return res.status(404).json({ msg: "post not found!" })

    const comment = post.comments.find(cmnt => cmnt.id === req.params.comment_id)

    // check if comment exists
    if (!comment) return res.status(404).json({ msg: "comment not found!" })

    // check if post is deleted by same user
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: "user not authorized!" })

    post.comments = post.comments.filter(cmnt => cmnt.id === req.params.comment_id ? false : true)
    // if (post.comments.filter(cmnt => cmnt.id.toString() === req.params.comment_id).length > 0) {

    // }

    post.save()

    res.json(post.comments)
  } catch (err) {
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "comment not found!" })
    console.log(err.message)
    res.status(500).send("Server Error!")
  }
})
module.exports = router 