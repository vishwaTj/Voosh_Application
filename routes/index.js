const express=require('express');

const router=express.Router();

const homeController = require('../controllers/home_controller');

console.log('Router connected');

router.get('/',homeController.home);
router.get('/login',homeController.login)
router.get('/add-user',homeController.signup);
router.post('/adduser',homeController.adduser);
router.post('/signin',homeController.signin);
router.post('/:id',homeController.createRecipe);


module.exports = router;