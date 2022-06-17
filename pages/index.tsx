import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, Grid, Image, Input, Text } from '@geist-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import tw from 'twin.macro'
import * as yup from 'yup'

type FormValues = {
  isbn: string
}

const schema: yup.SchemaOf<FormValues> = yup
  .object({
    isbn: yup
      .string()
      .test('len', 'Must be exactly 13 characters', val => val.length === 13)
      .required(),
  })
  .required()

const Container = styled.div`
  ${tw`flex h-screen justify-center items-center`};
`

type Book = {
  publisher: string
  language: string
  format: string
  image: string
  title_long: string
  edition: string
  dimensions: string
  pages: number
  date_published: string
  subjects: string[]
  authors: string[]
  title: string
  isbn13: string
  msrp: string
  binding: string
  isbn: string
}

const HomePage = () => {
  const [book, setBook] = useState<Book>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async data => {
    const res = await fetch(`/api/book/get/${data.isbn}`)
    const bookData: Book = await res.json()

    setBook(bookData)
  })

  return (
    <Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={6} height="200px">
          <Card shadow>
            <form onSubmit={onSubmit}>
              <Input placeholder="ISBN Code" {...register('isbn')} />
              <Text type="error">{errors.isbn?.message}</Text>

              <Button htmlType="submit">Submit</Button>
            </form>
          </Card>
        </Grid>
        {!!book && (
          <Grid xs={6} height="200px">
            <Card shadow>
              <Text h3>{book.title}</Text>
              <Text>{book.subjects.join(' | ')}</Text>

              <Text>{book.authors.join(' - ')}</Text>
              <Image width="280px" height="160px" src={book.image} />
            </Card>
          </Grid>
        )}
      </Grid.Container>
    </Container>
  )
}

export default HomePage
