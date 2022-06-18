import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Button, Card, Input, Page, Spacer, Text } from '@geist-ui/react'
import { magic } from 'helpers/magic'
import { ExtendedPage } from 'models/app.model'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'

const AFTER_LOGGED_ROUTE = '/app'

const login = async (router: NextRouter, email: string) => {
  // the Magic code
  const did = await magic.auth.loginWithMagicLink({ email })
  // Once we have the did from magic, login with our own API

  const authRequest = await fetch('/api/login', {
    method: 'POST',
    headers: { Authorization: `Bearer ${did}` },
  })

  if (authRequest.ok)
    // We successfully logged in, our API
    // set authorization cookies and now we
    // can redirect to the dashboard!
    router.push(AFTER_LOGGED_ROUTE)
  /* handle errors */ else throw new Error('No user')
}

const Login = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(AFTER_LOGGED_ROUTE)
  }, [router])

  const handleSubmit = async event => {
    event.preventDefault()

    const { elements } = event.target

    toast.promise(login(router, elements.email.value), {
      loading: 'Iniciando sesión...',
      success: 'Sesión iniciada',
      error: 'No pudo iniciar sesión',
    })
  }

  return (
    <>
      <div>
        <Card style={{ width: '30rem' }} shadow>
          <Text h4>Iniciar sesión</Text>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              htmlType="email"
              placeholder="Email"
              width="100%"
            />
            <Spacer h={0.5} />
            <Button htmlType="submit" width="100%">
              Log in
            </Button>
          </form>
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "${AFTER_LOGGED_ROUTE}"
          }
        `,
              }}
            />
          </Head>
        </Card>
      </div>
      <style jsx>{`
        div {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

const LoginPage: ExtendedPage = () => {
  return (
    <Page>
      <Login />
    </Page>
  )
}

LoginPage.pageName = 'Iniciar sesión'

export default LoginPage
