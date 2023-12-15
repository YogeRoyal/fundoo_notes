import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import bcrypt from "bcrypt";
// import {getUserByUsername} from '../services/user.service'
// import userSchema from '.models/user.model'
/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
  try {
    // Extract the password from the request body
    const { password,username,email,phone_no } = req.body;
    // const details = await UserService.createUser(req.body);
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new object with the hashed password and other user data
    const userDataWithHashedPassword = {
      password: hashedPassword,
      username:username,
      email:email,
      phone_no:phone_no,

    };

    // Call the registerUser method from your UserService with the updated data
    const data = await UserService.registerUser(userDataWithHashedPassword);

    if (data === null) {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        code: HttpStatus.NOT_ACCEPTABLE,
        data: data,
        message: 'Enter valid details',
      });
    } else {
      res.status(HttpStatus.CREATED).json({
        data:data,
        message: 'You are successfully registered',
      });
    }
  } catch (error) {
    if (error.message === 'User not found') {
      console.error('User not found');
    } else {
      console.error('An error occurred:', error.message);
      // Handle other types of errors as needed
    }
  
    res.status(HttpStatus.NOT_ACCEPTABLE).json({
      code: HttpStatus.NOT_ACCEPTABLE,
      data: error,
      message: 'Invalid details',
    });
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    // Extract the username and password from the request body
    const { username, password } = req.body;

    // Call the getUserByUsername method from your UserService to get the user data
    const userData = await UserService.getUserByUsername(username);

    if (!userData) {
      // User not found
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
      return;
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      res.status(HttpStatus.OK).json({
        message: 'Login successful',
      });
    } else {
      // Passwords do not match
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
       
        message: 'invalid password',
      });
    }
  } catch (error) {
    if (error.message === 'User not found') {
      console.error('User not found');
    } else {
      console.error('An error occurred:', error.message);
      // Handle other types of errors as needed
    }  
    next(error);
  }
};