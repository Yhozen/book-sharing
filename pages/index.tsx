import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, Grid, Input, Text } from '@geist-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { ExtendedPage } from 'models/app.model'
import { Book } from 'models/book.model'
import styled from 'styled-components'
import tw from 'twin.macro'
import * as yup from 'yup'

import { BookComponent } from 'components/book'

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

const HomePage: ExtendedPage = () => {
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
    const res = await axios.get<Book>(`/api/book/get/${data.isbn}`)

    setBook(res.data)
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
            <BookComponent book={book} />
          </Grid>
        )}
      </Grid.Container>
    </Container>
  )
}

HomePage.pageName = 'Home'

export default HomePage
