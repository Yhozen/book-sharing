import { Length } from 'class-validator'

export class CreateBookFromISBNDTO {
  @Length(13)
  isbn: string
}
