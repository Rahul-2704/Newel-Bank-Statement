const {Router}=require('express')
const router=Router();
const {getUsers,registerUser,loginUser}=require('../controllers/controller')
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/users',getUsers)
module.exports=router