import { IsOptional, MinLength } from 'class-validator'
import { Book } from 'models/book.model'

export class CreateBookDTO implements Book {
  @MinLength(1, {
    message: 'Title is too short',
  })
  title: string
  @IsOptional()
  publisher: string
  @IsOptional()
  language: string
  @IsOptional()
  format: string
  @IsOptional()
  image: string
  @IsOptional()
  title_long: string
  @IsOptional()
  edition: string
  @IsOptional()
  dimensions: string
  @IsOptional()
  pages: number
  @IsOptional()
  date_published: string
  @IsOptional()
  subjects: string[]
  @MinLength(1)
  authors: string[]
  @IsOptional()
  isbn13: string
  @IsOptional()
  msrp: string
  @IsOptional()
  binding: string
  @IsOptional()
  isbn: string
}
