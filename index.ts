import expres, {Request, Express} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectToDb } from "./src/config/db";
import authRouter from "./src/app/routes/auth.routes";
import { errorMiddleware } from "./src/app/middlewares/error.middleware";
import postRouter from "./src/app/routes/post.routes";
import asyncHandler from "./src/app/utils/asyncHandler";
import isAuthenticated from "./src/app/middlewares/auth.middleware";
import PostController from "./src/app/controllers/post.controller";
import UserController from "./src/app/controllers/user.controller";
import config from "./src/config";

export const app: Express = expres();


export interface IGetUserAuthInfoRequest extends Request {
  user: any
}


app.use(expres.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.post('/api/like/:id', asyncHandler(isAuthenticated), asyncHandler(PostController.like))
app.post('/api/unlike/:id', asyncHandler(isAuthenticated), asyncHandler(PostController.unlike))
app.post('/api/follow/:id', asyncHandler(isAuthenticated), asyncHandler(UserController.follow))
app.post('/api/unfollow/:id', asyncHandler(isAuthenticated), asyncHandler(UserController.unfollow))
app.post('/api/comment/:id', asyncHandler(isAuthenticated), asyncHandler(PostController.commentPost))
app.post('/api/unfollow/:id', asyncHandler(isAuthenticated), asyncHandler(UserController.unfollow))
app.get('/api/user', asyncHandler(isAuthenticated), asyncHandler(UserController.get))
app.use("/api/authenticate", authRouter)
app.use("/api/posts", postRouter);
app.use(cors({
    origin: "*",
    credentials: true
}))


app.use(errorMiddleware)

connectToDb();

app.listen(config.PORT || 5000, () => {
    console.log("server started at port 5000 ")
})

