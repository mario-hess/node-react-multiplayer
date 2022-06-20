import mongoose from 'mongoose'

import { characterSchema } from './character'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  characters: [characterSchema],
  register_date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', userSchema)
