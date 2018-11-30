const express = require('express');
const router = express.Router();

const { setMessage, getMessage, deleteMessage, updateMessage } = require('./ctrl');

router.post('/', setMessage);

router.get('/', getMessage);

router.delete('/', deleteMessage);

router.put('/', updateMessage);

module.exports = router;