import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File; 