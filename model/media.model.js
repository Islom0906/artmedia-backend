import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  path: {
    type: String, required: true
  },
  name: {
    type: String, required: true
  },
});

const Media = mongoose.model('Media', mediaSchema);

export { Media, mediaSchema };
