const Router = require("express");
const router = new Router()
const {UserController} = require("../controllers/user.controller")

const userController = new UserController()

router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.get('/user/:id', userController.getUser)
router.get('/user', userController.getUsers)

module.exports = router;