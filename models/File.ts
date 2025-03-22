import { get } from 'http';
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File; 




// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'USER'], default: 'USER' },
  type: { type: String, enum: ['STUDENT', 'FACULTY'], required: true },
  name: { type: String },
  contact: { type: String },
  year: { type: Number },
  branch: { type: String, enum: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT'] },
  section: { type: String },
  otp: { type: String },
  password: { type: String, required: true },
  otpExpiry: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  lastOtpAttempt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Group Schema
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  category: { type: String, enum: ['SECTION', 'CLUB', 'PLACEMENT', 'PUBLIC', 'UNIVERSAL'], required: true },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  year: { type: Number },
  branch: { type: String, enum: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT'] },
  section: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainImg: { type: String, required: true },
  description: { type: String, required: true },
  secondaryImg: [{ type: String }],
  secondaryDesc: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export { User, Group, Post };
