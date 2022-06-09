import mongoose from 'mongoose'

export const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ['Shaman', 'Mage', 'Druid'],
    required: true,
  },
})

export default mongoose.model('Character', characterSchema)
