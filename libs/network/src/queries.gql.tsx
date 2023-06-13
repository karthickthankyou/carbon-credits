import { gql } from 'graphql-request'

export const ProjectFragment = gql`
  fragment ProjectFragment on Project {
    id
    name
    about
    images
    owner
    lat
    lng
    verified
    verifiers {
      name
      walletAddress
      imageUrl
      active
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

export const searchProjects = gql`
  query searchProjects(
    $locationFilter: LocationFilterInput!
    $where: ProjectWhereInput
    $orderBy: [ProjectOrderByWithRelationInput!]
    $take: Int
    $skip: Int
    $distinct: [ProjectScalarFieldEnum!]
  ) {
    searchProjects(
      locationFilter: $locationFilter
      where: $where
      orderBy: $orderBy
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...ProjectFragment
    }
  }
`

export const inventories = gql`
  query inventories(
    $distinct: [InventoryScalarFieldEnum!]
    $skip: Int
    $take: Int
    $orderBy: [InventoryOrderByWithRelationInput!]
    $where: InventoryWhereInput
  ) {
    inventories(
      distinct: $distinct
      skip: $skip
      take: $take
      orderBy: $orderBy
      where: $where
    ) {
      id
      price
      balance
      projectId
      project {
        id
        name
      }
    }
    inventoriesCount(where: $where) {
      count
    }
  }
`

export const verifiers = gql`
  query verifiers(
    $distinct: [VerifierScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: VerifierWhereUniqueInput
    $orderBy: [VerifierOrderByWithRelationInput!]
    $where: VerifierWhereInput
  ) {
    verifiers(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      name
      walletAddress
      imageUrl
      active
    }
    verifiersCount(where: $where) {
      count
    }
  }
`
