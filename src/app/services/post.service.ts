import mongoose from "mongoose";
import { CommentPostDto, PostDto } from "../dtos/post.dto";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

const objectId = mongoose.Types.ObjectId;

export class PostService {
  async createPost(payload: any) {
    const post = await Post.create(payload);
    if (post) {
      return post;
    }
  }

  async likePost(postId: string, userId: string) {
    const updateLikes = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    if (updateLikes) {
      return updateLikes;
    }
  }

  async unlikePost(postId: string, userId: string) {
    const updateLikes = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    if (updateLikes) {
      return updateLikes;
    }
  }

  async commentPost(
    commentDto: CommentPostDto,
    commenterId: string,
    postId: string
  ) {
    const comment = await Comment.create({
      commenterId,
      postId,
      comment: commentDto.comment,
    });
    if (comment) {
      return comment.id;
    }
  }

  async showPost(postId: string) {
    const post = await Post.aggregate([
      {
        $match: {
          _id: new objectId(postId),
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments'
        }
      },
      {
        $unwind: { path: '$comments', preserveNullAndEmptyArrays: true }
        
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: '$author'
      },      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          content: { $first: '$content' },
          likes: { $first: '$likes' },
          author: {
        $first: {
          $concat: ['$author.firstName', ' ', '$author.lastName']
        }
      },
          authorId: { $first: '$author._id' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          comments: { $push: '$comments' }
        }
      },
      
    ]);

    if(post.length > 0)
    {
      const finalData = {
          id: post[0]._id,
          title: post[0].title,
          content: post[0].content,
          created_at: post[0].createdAt,
          comments: post[0].comments.map((c: any) => c.comment),
          likes: post[0].likes.length
        } 
        return finalData
    }
    else {
      return post
    }
  }

  async getPosts(userId: string) {
    console.log(userId);
    const posts = await Post.aggregate([
      {
        $match: {
          author: new objectId(userId),
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments'
        }
      },
      {
        $unwind: { path: '$comments', preserveNullAndEmptyArrays: true }
        
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: '$author'
      },      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          content: { $first: '$content' },
          likes: { $first: '$likes' },
          author: {
        $first: {
          $concat: ['$author.firstName', ' ', '$author.lastName']
        }
      },
          authorId: { $first: '$author._id' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          comments: { $push: '$comments' }
        }
      },
      
    ]);
    if (posts) {
      const finalArray = posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          created_at: post.createdAt,
          comments: post.comments.map((c: any) => c.comment),
          likes: post.likes.length
        }
      }).sort((a: any,b: any) => {
        return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      })
      return finalArray;
    }
  }
}
