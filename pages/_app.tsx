import { FC } from 'react'
import { ExtendedPage } from 'models/app.model'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { GlobalStyles } from 'styles/global-styles'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

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
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>

      <GlobalStyles />
    </>,
  )
}

export default MyApp
