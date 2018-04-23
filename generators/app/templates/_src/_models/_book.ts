import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsNegative,
  IsPositive
} from 'class-validator';
import { isNullOrUndefined } from 'util';

export class Book {
  @IsNotEmpty({ message: '$property is required' })
  title: string;
  @IsNotEmpty({ message: '$property is required' })
  author: string;
  @IsNotEmpty({ message: '$property is required' })
  @IsInt({ message: 'year must be numeric' })
  @Min(1950, {
    message:
      'Invalid year. year should be more than $constraint1, but actual is $value'
  })
  @Max(new Date().getFullYear(), {
    message:
      'Invalid year. year should be less than or equal to $constraint1, but actual is $value'
  })
  @IsPositive()
  year: number;
  @IsInt({ message: 'Page number must be numeric' })
  @IsNotEmpty({ message: '$property is required' })
  @IsPositive()
  pages: number;

  // constructor() {}

  constructor(title: string, author: string, year: number, pages: number) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
  }

  // IsEqual(b: Book): boolean {
  //   if (isNullOrUndefined(b)) {
  //     return false;
  //   }
  //   if (
  //     this.title === b.title &&
  //     this.author === b.author &&
  //     this.year === b.year &&
  //     this.pages === b.pages
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }
}
