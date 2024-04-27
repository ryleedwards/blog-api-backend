import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String },
    metaTitle: { type: String },
    published: { type: Boolean },
    publishedAt: { type: Date },
    content: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
