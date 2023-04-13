import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class PostDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  constructor(
    title: string,
    author: string,
    content: string,
  ) {
    this.title = title;
    this.content = content;
  }
}

export class CommentPostDto {

  @IsString()
  @IsNotEmpty()
  comment: string;

  constructor(
    comment: string,
  ) {
    this.comment = comment;
  }
}


