import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { Secret, verify } from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../../..";

const isAuthenticated = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if(!req.cookies.token)
    {
        throw new Error("401")
    }
    const decoded = verify(req.cookies.token as string, config.SECRET_KEY as Secret)
    if(decoded)
    {
        req.user = decoded
         next()
    }
    else
    {
        throw new Error("401")
    }
};

export default isAuthenticated;