import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../../..';
import { UserService } from '../services/user.service';

const userService = new UserService();

export default class UserController {
  static async follow(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await userService.follow(req.user.id, req.params.id)

    return res.status(200).json({
      success: true,
      message: 'User has been followed successfully',
    });
  }

  static async unfollow(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await userService.unfollow(req.user.id, req.params.id)

    return res.status(200).json({
      success: true,
      message: 'User has been unfollowed successfully',
    });
  }

  static async get(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const user = await userService.getUser(req.user.id)

    return res.status(200).json({
      success: true,
      message: 'User has been fetched successfully',
      data: user
    });
  }
}
