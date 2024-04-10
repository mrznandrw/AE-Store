// 111require('dotenv').config()
import config from 'dotenv/config'
// 111 const express = require('express')
// 111 const sequelize = require('./db')
// 111 const models = require('./models/models')
// 111 const cors = require('cors')
// 111 const fileUpload = require('express-fileupload')
// 111 const router = require('./routes/index')
// 111 const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// 111 const path = require('path')
// 111 const cookieParser = require('cookie-parser')

import express from 'express'
import sequelize from './db.js'
//import models from './models/models.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import path from 'path'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser(process.env.SECRET_KEY))
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
//app.use(cors())
app.use(express.json())
// 111 app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)


//Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync( {alter: true }) //строка для обновления существующей бд при изменении в models.js
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}



start()