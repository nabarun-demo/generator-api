import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsEmail,
  MinLength,
  MaxLength
} from "class-validator";
import { isNullOrUndefined } from "util";

export class User {
  @IsNotEmpty({ message: "$property is required" })
  @MinLength(5, {
    each: true,
    message: "$property is too short. Minimal length is $value characters"
  })
  @MaxLength(50, {
    each: true,
    message: "$property is too long. Maximal length is $value characters"
  })
  public username: string;
  @IsNotEmpty({ message: "$property is required" })
  @IsEmail({}, { message: "Please enter valid $property" })
  public email: string;
  @IsInt({ message: "$property must be numeric" })
  @IsNotEmpty({ message: "$property is required" })
  @IsPositive()
  public age: number;

  constructor(username: string, email: string, age: number) {
    this.username = username;
    this.email = email;
    this.age = age;
  }
}
