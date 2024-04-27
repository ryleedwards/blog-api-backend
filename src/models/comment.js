import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    publishedAt: { type: Date },
    content: { type: String },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
