// routes/messageRoutes.js
const express = require('express');
const { sendMessage } = require('../controller/message.controller');

const router = express.Router();

router.post('/send', sendMessage);

module.exports = router;
