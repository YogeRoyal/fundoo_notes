import { number, string } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String
    },
    username: {
      type: String,

    },
    password: {
      type: String
    },
    phone_no: {
      type: String,
    },
    city: {
      type: String
    },
    email: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);