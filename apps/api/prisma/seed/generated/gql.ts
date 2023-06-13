/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  fragment ProjectFragment on Project {\n    id\n    name\n    owner\n    verifiers {\n      name\n      walletAddress\n      imageUrl\n      active\n    }\n  }\n':
    types.ProjectFragmentFragmentDoc,
  '\n  query projects(\n    $distinct: [ProjectScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: ProjectWhereUniqueInput\n    $orderBy: [ProjectOrderByWithRelationInput!]\n    $where: ProjectWhereInput\n    $searchTerm: String\n  ) {\n    projects(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n      searchTerm: $searchTerm\n    ) {\n      ...ProjectFragment\n    }\n    projectsCount(where: $where) {\n      count\n    }\n  }\n  \n':
    types.ProjectsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProjectFragment on Project {\n    id\n    name\n    owner\n    verifiers {\n      name\n      walletAddress\n      imageUrl\n      active\n    }\n  }\n',
): (typeof documents)['\n  fragment ProjectFragment on Project {\n    id\n    name\n    owner\n    verifiers {\n      name\n      walletAddress\n      imageUrl\n      active\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query projects(\n    $distinct: [ProjectScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: ProjectWhereUniqueInput\n    $orderBy: [ProjectOrderByWithRelationInput!]\n    $where: ProjectWhereInput\n    $searchTerm: String\n  ) {\n    projects(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n      searchTerm: $searchTerm\n    ) {\n      ...ProjectFragment\n    }\n    projectsCount(where: $where) {\n      count\n    }\n  }\n  \n',
): (typeof documents)['\n  query projects(\n    $distinct: [ProjectScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: ProjectWhereUniqueInput\n    $orderBy: [ProjectOrderByWithRelationInput!]\n    $where: ProjectWhereInput\n    $searchTerm: String\n  ) {\n    projects(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n      searchTerm: $searchTerm\n    ) {\n      ...ProjectFragment\n    }\n    projectsCount(where: $where) {\n      count\n    }\n  }\n  \n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
