import {
  Body,
  createHandler,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators'
import axios from 'axios'
import { Book } from 'models/book.model'
import { CreateBookDTO } from 'server/dto/book/create-book.dto'
import { Auth } from 'server/middlewares/auth.middleware'
import { WithMongo } from 'server/middlewares/mongo.middleware'
import { BookModel } from 'server/models/book.model'
import {
  CurrentUser,
  MagicUser,
} from 'server/param-decorators/current-user.decorator'

class BookHandler {
  @Auth()
  @WithMongo()
  @Post('/create')
  async createUser(
    @Body(ValidationPipe) body: CreateBookDTO,
    @CurrentUser() user: MagicUser,
  ): Promise<Book> {
    const book = await BookModel.create({ ...body, owner: user.email })

    return book
  }

  @WithMongo()
  @Get('/get/:isbn')
  async get(@Param('isbn') isbn: string): Promise<Book> {
    const res = await axios.get(`https://api2.isbndb.com/book/${isbn}`, {
      headers: {
        Authorization: process.env.ISBNDB_API_KEY,
      },
    })

    return res.data?.book ?? {}
  }
}

export default createHandler(BookHandler)
