import {  Response } from 'express';
import { IGetUserAuthInfoRequest } from '../../..';
import Post from '../models/post.model';
import { PostService } from '../services/post.service';
import { CommentPostDto, PostDto } from '../dtos/post.dto';
const postService = new PostService();

export default class PostController {
  static async create(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const postDto: PostDto = req.body;
    const post = await postService.createPost({...postDto, author: req.user.id})
    return res.status(201).json({
      success: true,
      message: 'Post has been uploaded successfully',
      data: post,
    });
  }

  static async index(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const posts = await postService.getPosts(req.user.id)
    return res.status(200).json({
      success: true,
      message: 'Posts has been pulled successfully',
      data: posts,
    });
  }

  static async show(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const post = await postService.showPost(req.params.id)
    return res.status(200).json({
      success: true,
      message: 'Post has been pulled successfully',
      data: post,
    });
  }

  static async delete(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await Post.deleteOne({ _id: req.params.id })
    return res.status(200).json({
      success: true,
      message: 'Post has been delete successfully',
    });
  }

  static async like(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await postService.likePost(req.params.id, req.user.id)
    return res.status(200).json({
      success: true,
      message: 'Post has been liked successfully',
    });
  }

  static async unlike(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await postService.unlikePost(req.params.id, req.user.id)
    return res.status(200).json({
      success: true,
      message: 'Post has been unliked successfully',
    });
  }

  static async commentPost(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const commentDto: CommentPostDto = req.body
    const comment = await postService.commentPost(commentDto, req.user.id, req.params.id)
    return res.status(200).json({
      success: true,
      message: 'Comment on post has been made successfully',
      data: comment
    });
  }

}
