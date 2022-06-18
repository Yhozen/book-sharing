import axios from 'axios'
import { Book } from 'models/book.model'

export const get = async (isbn: string): Promise<Book> => {
  const res = await axios.get<{ book: Book }>(
    `https://api2.isbndb.com/book/${isbn}`,
    {
      headers: {
        Authorization: process.env.ISBNDB_API_KEY,
      },
    },
  )

  return res.data?.book
}
