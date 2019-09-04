const express = require('express')

const postRouter = require('../../posts/postRouter.js')
const userRouter = require('../../users/userRouter.js')

const server = express()

server.use(express.json())

server.use('/posts', postRouter)
server.use('/users', userRouter)

module.exports = server