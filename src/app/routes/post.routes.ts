import express from "express";
import dtoValidationMiddleware from "../middlewares/dto.middleware";
import asyncHandler from "../utils/asyncHandler";
import PostController from "../controllers/post.controller";
import { PostDto } from "../dtos/post.dto";
import isAuthenticated from "../middlewares/auth.middleware";

const postRouter = express.Router();

postRouter.post("/", asyncHandler(isAuthenticated), dtoValidationMiddleware(PostDto), asyncHandler(PostController.create));
postRouter.get("/:id", asyncHandler(isAuthenticated), asyncHandler(PostController.show));
postRouter.get("/", asyncHandler(isAuthenticated), asyncHandler(PostController.index));
postRouter.delete("/:id", asyncHandler(isAuthenticated), asyncHandler(PostController.delete));

export default postRouter;