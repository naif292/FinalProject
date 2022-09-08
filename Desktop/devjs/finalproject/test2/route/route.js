const express = require('express');
const registration = require('../Controller/register');
const list = require('../Controller/list');
const comments = require('../Controller/Comment');
const bid = require('../Controller/bid');
const close = require('../Controller/close');
const closed = require('../Controller/closedaAuction');


const router = express.Router();
router.get('/list',list.add_item)
router.post('/list',list.create_item)
router.post('/signup',registration.singup)
router.get('/',registration.login2)
router.post('/login',registration.login)
router.get('/signup',registration.signup2)
router.get('/dashboard',registration.dashboard)
router.get('/itemes/:iteme',list.get_itmes)
router.post('/comment',comments.createComment)
router.post('/placbid',bid.placeBid)
router.post('/close',close.closeAuction)
router.post('/deletecomment',comments.deleteComment)
router.get('/closed',closed.getClosed)


module.exports = router; 