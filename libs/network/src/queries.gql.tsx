import { gql } from 'graphql-request'

export const ProjectFragment = gql`
  fragment ProjectFragment on Project {
    id
    name
    owner
    price
    balance
    verifiers {
      address
    }
  }
`

export const projects = gql`
  query projects(
    $distinct: [ProjectScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: ProjectWhereUniqueInput
    $orderBy: [ProjectOrderByWithRelationInput!]
    $where: ProjectWhereInput
    $searchTerm: String
  ) {
    projects(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
      searchTerm: $searchTerm
    ) {
      ...ProjectFragment
    }
    projectsCount(where: $where) {
      count
    }
  }
  ${ProjectFragment}
`
