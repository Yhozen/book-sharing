import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

const LoginContainer = styled.div`
  ${tw`min-h-screen flex flex-col items-center justify-center`};
`
const LoginTitle = styled.h1`
  ${tw`font-normal text-4xl`};
`
const LoginSubtitle = styled.h2`
  ${tw`font-normal text-sm italic text-center text-pink-500`};
`

const AccentSpan = styled.span`
  ${tw`font-bold text-pink-500`};
`
const LoginForm = styled.form`
  ${tw`flex flex-col items-center justify-center gap-4`};
`

const LoginInput = styled.input`
  ${tw`bg-blue-400 text-center text-white rounded-full placeholder-pink-50`};
`

const Login = () => {
  return (
    <LoginContainer>
      <div className="mb-10">
        <LoginTitle>
          Ingresa a <AccentSpan> Booksharing</AccentSpan>
        </LoginTitle>
        <LoginSubtitle>Login</LoginSubtitle>
      </div>
      <LoginForm>
        <LoginInput placeholder="E-mail" type="text" />
        <input
          className="bg-blue-400 text-center placeholder-slate-50 text-white rounded-full"
          placeholder="Contraseña"
          type="password"
        />

        <Link href="#" passHref>
          <button className="px-4 py-1 bg-green-400 rounded-lg text-white">
            Login
          </button>
        </Link>
      </LoginForm>
      <a href="#" className="underline mt-2">
        ¿Olvidaste tu contraseña?
      </a>
    </LoginContainer>
  )
}

export default Login
