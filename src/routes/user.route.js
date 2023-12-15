import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator} from '../validators/user.validator'


const router = express.Router();


//route to create a new user
router.post('/register',newUserValidator,userController.registerUser);
//login user
router.post('/login',userController.loginUser);

export default router;
