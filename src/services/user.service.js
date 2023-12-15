import User from '../models/user.model';


export const registerUser = async (body) => {
  const userCheck = await User.exists(body)
  if (!userCheck) {
    const data = await User.create(body)
    return data;
  }
};


export const getUserByUsername = async (username) => {
  try {
    // Find a user by username in the database
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found'); // Throw a specific error if user is not found
    }
    // Return the user data
    return user;
  } catch (error) {
    throw error; // Handle the error appropriately in your application
  }
};


