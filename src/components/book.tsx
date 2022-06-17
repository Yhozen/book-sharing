import { FC } from 'react'
import { Card, Image, Text } from '@geist-ui/core'
import { Book } from 'models/book.model'

type BookComponentProps = {
  book: Book
}

export const BookComponent: FC<BookComponentProps> = ({ book }) => {
  return (
    <Card shadow>
      <Text h3>{book.title}</Text>
      <Text>{book.subjects.join(' | ')}</Text>

      <Text>{book.authors.join(' - ')}</Text>
      <Image width="280px" height="160px" src={book.image} />
    </Card>
  )
}
