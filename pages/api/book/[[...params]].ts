import { createHandler, Get, Param } from '@storyofams/next-api-decorators'
import axios from 'axios'
import { WithMongo } from 'server/middlewares/mongo.middleware'

type Book = {
  publisher: string
  language: string
  image: string
  title_long: string
  dimensions: string
  pages: number
  date_published: string
  authors: string[]
  title: string
  isbn13: string
  msrp: string
  binding: string
  isbn: string
}

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
