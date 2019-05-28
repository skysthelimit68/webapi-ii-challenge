const express = require('express');

const server = express();

const router = require('../router.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(
        '<h1>Testing API II</h1>'
    )
})



server.use('/api/posts', router)

module.exports = server;