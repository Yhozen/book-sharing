import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from 'components/button'

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

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async data => {
    const res = await fetch(`/api/book/get/${data.isbn}`)
    const bookData = await res.json()

    alert(bookData)
    console.log('ye')
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <input {...register('isbn')} />
        <p>{errors.isbn?.message}</p>

        <input type="submit" />
      </form>
      <p>gola</p>
      <Button variant="primary">hola</Button>
    </>
  )
}

export default HomePage
