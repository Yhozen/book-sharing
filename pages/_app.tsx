import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { ExtendedPage } from 'models/app.model'
import { AppProps } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import { GlobalStyles } from 'styles/global-styles'

type MyAppProps<PassedProps> = AppProps & {
  Component: ExtendedPage<PassedProps>
}

const MyApp: FC<MyAppProps<Record<string, never>>> = ({
  Component,
  pageProps,
}) => {
  const getLayout = Component?.getLayout || (page => page)

  return getLayout(
    <>
      <Head>
        <title>{Component?.pageName ?? 'Book sharing app'}</title>
      </Head>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
      <Toaster />

      <GlobalStyles />
    </>,
  )
}

export default MyApp
