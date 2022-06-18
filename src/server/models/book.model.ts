import { getModelForClass, prop } from '@typegoose/typegoose'
import { Book as BookType } from 'models/book.model'

class Book implements BookType {
  @prop()
  title: string
  @prop()
  publisher?: string
  @prop()
  language?: string
  @prop()
  format?: string
  @prop()
  image?: string
  @prop()
  title_long?: string
  @prop()
  edition?: string
  @prop()
  dimensions?: string
  @prop()
  pages?: number
  @prop()
  date_published?: string
  @prop()
  subjects?: string[]
  @prop()
  authors: string[]
  @prop()
  isbn13?: string
  @prop()
  msrp?: string
  @prop()
  binding?: string
  @prop()
  isbn?: string
}

export const BookModel = getModelForClass(Book)
