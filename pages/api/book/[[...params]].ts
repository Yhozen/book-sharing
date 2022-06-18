import {
  Body,
  createHandler,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators'
import { Book } from 'models/book.model'
import { CreateBookDTO } from 'server/dto/book/create-book.dto'
import { CreateBookFromISBNDTO } from 'server/dto/book/create-book-from-isbn'
import { Auth } from 'server/middlewares/auth.middleware'
import { WithMongo } from 'server/middlewares/mongo.middleware'
import { BookModel } from 'server/models/book.model'
import {
  CurrentUser,
  MagicUser,
} from 'server/param-decorators/current-user.decorator'
import * as isbndbService from 'server/services/isbndb.service'

class BookHandler {
  @Auth()
  @WithMongo()
  @Post('/create')
  async createBook(
    @Body(ValidationPipe) body: CreateBookDTO,
    @CurrentUser() user: MagicUser,
  ): Promise<Book> {
    const book = await BookModel.create({ ...body, owner: user.email })

    return book
  }

  @Auth()
  @WithMongo()
  @Post('/ISBN/create')
  async createFromISBN(
    @Body(ValidationPipe) body: CreateBookFromISBNDTO,
    @CurrentUser() user: MagicUser,
  ): Promise<Book> {
    const bookData = await isbndbService.get(body.isbn)

    const book = await BookModel.create({ ...bookData, owner: user.email })

    return book
  }

  @WithMongo()
  @Get('/get/:isbn')
  async get(@Param('isbn') isbn: string): Promise<Book> {
    const book = await isbndbService.get(isbn)

    return book
  }
}

export default createHandler(BookHandler)
