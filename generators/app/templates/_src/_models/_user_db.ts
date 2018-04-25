import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsEmail,
  MinLength,
  MaxLength
} from "class-validator";
import IU from "../dataaccess/schemas/IUser";

export class UserModel {
  @IsNotEmpty({ message: "$property is required" })
  @MinLength(5, {
    each: true,
    message: "$property is too short. Minimal length is $value characters"
  })
  @MaxLength(50, {
    each: true,
    message: "$property is too long. Maximal length is $value characters"
  })
  username: string;
  @IsNotEmpty({ message: "$property is required" })
  @IsEmail({}, { message: "Please enter valid $property" })
  email: string;
  @IsInt({ message: "$property must be numeric" })
  @IsNotEmpty({ message: "$property is required" })
  @IsPositive()
  age: number;

  constructor(user?: IU) {
    this.username = (user && user.username) || "";
    this.email = (user && user.email) || "";
    this.age = (user && user.age) || 0;
  }
}
