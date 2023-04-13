import mongoose, { Schema, model } from 'mongoose';

interface IComment {
  postId: mongoose.Schema.Types.ObjectId;
  commenterId: mongoose.Schema.Types.ObjectId;
  comment: string;
}

const commentSchema = new Schema<IComment>({
  comment: { type: String, required: true },
  commenterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: "Post" },
}, {
  timestamps: true
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;