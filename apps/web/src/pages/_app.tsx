import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ApolloProvider } from '@carbon-credits/network/src/config/apollo'
import { Header } from '@carbon-credits/ui/src/components/organisms/Header'
import { MenuItem } from '@carbon-credits/ui/src/components/organisms/Header/Header'

const MENUITEMS: MenuItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Inventory', href: '/inventory', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'My projects', href: '/my-projects', loggedIn: true },
  { label: 'Reports', href: '/reports', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Header menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
