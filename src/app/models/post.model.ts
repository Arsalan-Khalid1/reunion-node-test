import mongoose, { Schema, model } from 'mongoose';

interface IPost {
  title: string;
  author: mongoose.Schema.Types.ObjectId;
  content: string;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true, unique: true, },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true
});


postSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const post = this;
  try {
    await mongoose.model('Comment').deleteMany({ post: post._id });
  } catch (error) {
    console.log(error);
  }
});

// postSchema.path("comments").ref("Comment")

const Post = model<IPost>('Post', postSchema);

export default Post;