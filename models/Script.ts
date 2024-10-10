import mongoose from 'mongoose';

const ScriptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this script.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the script content'],
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: [true, 'Please provide a user ID'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Script || mongoose.model('Script', ScriptSchema);