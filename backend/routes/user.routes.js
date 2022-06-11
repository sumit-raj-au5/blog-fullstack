const router = require('express').Router();
const {getAllUser, signup, signin} = require('../controllers/user.controller');
//handling get request
router.get('/', getAllUser);
router.post('/signup', signup);
router.post('/signin', signin);
module.exports=router;