const express = require('express');

const cors = require('cors');

const server = express();

const router = require('../router.js');

server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
    res.send(
        '<h1>Testing API II</h1>'
    )
})



server.use('/api/posts', router)

module.exports = server;