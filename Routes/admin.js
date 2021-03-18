const express = require('express');

const router = express.Router();
const adminContoller = require('../controllers/UserController');

router.get('/admin/login', adminContoller.getlogin);
router.get('/admin/createuser',adminContoller.getCreateUser);
router.get('/admin/dashboard',adminContoller.getDashboard);
router.post('/admin/createuser',adminContoller.postCreateUser);
router.post('/admin/postLogin',adminContoller.postLogin);
router.get('/admin/logout',adminContoller.getAdminLogout);
module.exports = router;