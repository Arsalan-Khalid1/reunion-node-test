import { Request, Response } from 'express';
import { LoginDTO, SignupDTO } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { IGetUserAuthInfoRequest } from '../../..';

const authService = new AuthService();

export default class AuthController {
  static async signUp(req: Request, res: Response): Promise<Response> {
    const authData: SignupDTO = req.body;
    const newUser = await authService.signup(authData);

    return res.status(201).json({
      success: true,
      message: 'User has been created successfully',
      data: newUser,
    });
  }

  static async signIn(req: Request, res: Response): Promise<Response> {
    const authDto: LoginDTO = req.body;

    const data = await authService.login(authDto);
    return res.cookie("token", data.accessToken, { maxAge: 2 * 60 * 60 * 1000 }).status(200).json({
      success: true,
      message: 'User has been signed in successfully',
      data: data.accessToken
    });
  }

  static async logout(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    return res.status(200).clearCookie("token").json({
      success: true,
      message: 'User has been signed out successfully',
    });
  }
}
