#!/usr/bin/node

// import dependencies
import express from 'express'
import path from 'path'
import pages from './pages.js'

import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// starting express
const server = express()

server
    // use body request
    .use(express.urlencoded({ extended: true}))
    // setting static files
    .use(express.static('public'))

    // config template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')

    // application routes
    .get('/', pages.index)
    .get('/orphanage-add', pages.orphanageAdd)
    .get('/orphanage-details', pages.orphanageDetails)
    .get('/orphanage-map', pages.orphanagesMap)
    .post('/orphanage-save', pages.orphanageSave)

// start server
server.listen(5500)