import express from 'express';
import cors from 'cors'

import userRoutes from './apis/user-apis.js'
import postRoutes from './apis/post-apis.js'
import authenticationRoutes from './apis/authentication-apis.js'

import dotenv from 'dotenv'
dotenv.config('.env')

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.use('/', userRoutes)
app.use('/', postRoutes)
app.use('/', authenticationRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server Started..${process.env.APPLICATION_NAME}`)
    console.log(`Now listening on ${process.env.PORT}`)
})

