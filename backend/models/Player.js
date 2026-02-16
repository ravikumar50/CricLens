import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true }
});

// Case-insensitive search works best with a text index
playerSchema.index({ name: 'text' });

export default mongoose.model('Player', playerSchema);