const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.put('/update_user',auth, userCtrl.updateUserpassword)

router.get('/get_all_user', userCtrl.getAllUser)

router.delete('/delete_user/:id', userCtrl.deleteUser)

router.put('/update_user/:id', userCtrl.updateUserWithId)

router.get('/detail/:id',  userCtrl.getUserWithId)




module.exports = router