import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ReactNode } from 'react'
import { useAccount } from '@carbon-credits/hooks/web3'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const { account } = useAccount()

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
    headers: {
      authorization: account || '',
    },
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_API_URL + '/graphql',
      connectionParams: {
        authorization: account || '',
      },
    }),
  )

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )
  // Create an Apollo Client instance
  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <Provider client={apolloClient}>{children}</Provider>
}
