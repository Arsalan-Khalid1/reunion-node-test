import { IsEmail, Length, IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { Match } from "../decorators/match";

export class SignupDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match("password")
  passwordConfirmation: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(6)
  username: string;

  constructor(
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string,
    username: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.passwordConfirmation = passwordConfirmation
  }
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}
