import { GraphQLClient } from 'graphql-request'

export const getGraphqlClient = async () => {
  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL + '/graphql', {})
}
