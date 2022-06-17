import { createHandler, Get, Param } from '@storyofams/next-api-decorators'
import axios from 'axios'
import { Book } from 'models/book.model'
import { WithMongo } from 'server/middlewares/mongo.middleware'

class JobHandler {
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

export default createHandler(JobHandler)
