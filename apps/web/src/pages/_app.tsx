import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ApolloProvider } from '@carbon-credits/network/src/config/apollo'
import { Header } from '@carbon-credits/ui/src/components/organisms/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
