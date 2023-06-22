const router = require('express').Router();
const Owner = require('../controller/ownerController');

router.get('/owner/login', Owner.owner_login);

module.exports = router;
