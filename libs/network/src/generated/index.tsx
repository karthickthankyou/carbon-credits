import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput'
  count: Scalars['Int']
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<Scalars['Boolean']>
}

export type Creation = {
  __typename?: 'Creation'
  id: Scalars['Int']
  price: Scalars['Int']
  projectId: Scalars['Int']
  quantity: Scalars['Int']
  timestamp: Scalars['DateTime']
  user: Scalars['String']
}

export type CreationListRelationFilter = {
  every?: InputMaybe<CreationWhereInput>
  none?: InputMaybe<CreationWhereInput>
  some?: InputMaybe<CreationWhereInput>
}

export type CreationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type CreationOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  project?: InputMaybe<ProjectOrderByWithRelationInput>
  projectId?: InputMaybe<SortOrder>
  quantity?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  user?: InputMaybe<SortOrder>
}

export enum CreationScalarFieldEnum {
  Id = 'id',
  Price = 'price',
  ProjectId = 'projectId',
  Quantity = 'quantity',
  Timestamp = 'timestamp',
  User = 'user',
}

export type CreationWhereInput = {
  AND?: InputMaybe<Array<CreationWhereInput>>
  NOT?: InputMaybe<Array<CreationWhereInput>>
  OR?: InputMaybe<Array<CreationWhereInput>>
  id?: InputMaybe<IntFilter>
  price?: InputMaybe<IntFilter>
  project?: InputMaybe<ProjectRelationFilter>
  projectId?: InputMaybe<IntFilter>
  quantity?: InputMaybe<IntFilter>
  timestamp?: InputMaybe<DateTimeFilter>
  user?: InputMaybe<StringFilter>
}

export type CreationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Scalars['Float']>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<Scalars['Float']>
  notIn?: InputMaybe<Scalars['Float']>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Scalars['Int']>
}

export type Inventory = {
  __typename?: 'Inventory'
  balance: Scalars['Int']
  createdAt: Scalars['DateTime']
  forSale: Scalars['Boolean']
  id: Scalars['Int']
  price: Scalars['Int']
  project?: Maybe<Project>
  projectId: Scalars['Int']
  updatedAt: Scalars['DateTime']
  user: Scalars['String']
}

export type InventoryListRelationFilter = {
  every?: InputMaybe<InventoryWhereInput>
  none?: InputMaybe<InventoryWhereInput>
  some?: InputMaybe<InventoryWhereInput>
}

export type InventoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type InventoryOrderByWithRelationInput = {
  balance?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  forSale?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  project?: InputMaybe<ProjectOrderByWithRelationInput>
  projectId?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  user?: InputMaybe<SortOrder>
}

export enum InventoryScalarFieldEnum {
  Balance = 'balance',
  CreatedAt = 'createdAt',
  ForSale = 'forSale',
  Id = 'id',
  Price = 'price',
  ProjectId = 'projectId',
  UpdatedAt = 'updatedAt',
  User = 'user',
}

export type InventoryUserProjectIdCompoundUniqueInput = {
  projectId: Scalars['Int']
  user: Scalars['String']
}

export type InventoryWhereInput = {
  AND?: InputMaybe<Array<InventoryWhereInput>>
  NOT?: InputMaybe<Array<InventoryWhereInput>>
  OR?: InputMaybe<Array<InventoryWhereInput>>
  balance?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  forSale?: InputMaybe<BoolFilter>
  id?: InputMaybe<IntFilter>
  price?: InputMaybe<IntFilter>
  project?: InputMaybe<ProjectRelationFilter>
  projectId?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  user?: InputMaybe<StringFilter>
}

export type InventoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
  user_projectId?: InputMaybe<InventoryUserProjectIdCompoundUniqueInput>
}

export type LocationFilterInput = {
  nw_lat: Scalars['Float']
  nw_lng: Scalars['Float']
  se_lat: Scalars['Float']
  se_lng: Scalars['Float']
}

export type Mutation = {
  __typename?: 'Mutation'
  findAll: Retirement
}

export type MutationFindAllArgs = {
  cursor?: InputMaybe<RetirementWhereUniqueInput>
  distinct?: InputMaybe<Array<RetirementScalarFieldEnum>>
  orderBy?: InputMaybe<Array<RetirementOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RetirementWhereInput>
}

export type Project = {
  __typename?: 'Project'
  about: Scalars['String']
  id: Scalars['Int']
  images: Array<Scalars['String']>
  inventories?: Maybe<Array<Inventory>>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  name: Scalars['String']
  owner: Scalars['String']
  retirements?: Maybe<Array<Retirement>>
  transfers?: Maybe<Array<Transfer>>
  verified?: Maybe<Scalars['Int']>
  verifiers?: Maybe<Array<Verifier>>
}

export type ProjectListRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>
  none?: InputMaybe<ProjectWhereInput>
  some?: InputMaybe<ProjectWhereInput>
}

export type ProjectOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ProjectOrderByWithRelationInput = {
  about?: InputMaybe<SortOrder>
  creations?: InputMaybe<CreationOrderByRelationAggregateInput>
  id?: InputMaybe<SortOrder>
  images?: InputMaybe<SortOrder>
  inventories?: InputMaybe<InventoryOrderByRelationAggregateInput>
  lat?: InputMaybe<SortOrder>
  lng?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  owner?: InputMaybe<SortOrder>
  retirements?: InputMaybe<RetirementOrderByRelationAggregateInput>
  transfers?: InputMaybe<TransferOrderByRelationAggregateInput>
  verifiers?: InputMaybe<VerifierOrderByRelationAggregateInput>
}

export type ProjectRelationFilter = {
  is?: InputMaybe<ProjectWhereInput>
  isNot?: InputMaybe<ProjectWhereInput>
}

export enum ProjectScalarFieldEnum {
  About = 'about',
  Id = 'id',
  Images = 'images',
  Lat = 'lat',
  Lng = 'lng',
  Name = 'name',
  Owner = 'owner',
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>
  NOT?: InputMaybe<Array<ProjectWhereInput>>
  OR?: InputMaybe<Array<ProjectWhereInput>>
  about?: InputMaybe<StringFilter>
  creations?: InputMaybe<CreationListRelationFilter>
  id?: InputMaybe<IntFilter>
  images?: InputMaybe<StringListFilter>
  inventories?: InputMaybe<InventoryListRelationFilter>
  lat?: InputMaybe<FloatFilter>
  lng?: InputMaybe<FloatFilter>
  name?: InputMaybe<StringFilter>
  owner?: InputMaybe<StringFilter>
  retirements?: InputMaybe<RetirementListRelationFilter>
  transfers?: InputMaybe<TransferListRelationFilter>
  verifiers?: InputMaybe<VerifierListRelationFilter>
}

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  creation: Creation
  creations: Array<Creation>
  inventories: Array<Inventory>
  inventoriesCount: AggregateCountOutput
  inventory: Inventory
  project: Project
  projects: Array<Project>
  projectsCount: AggregateCountOutput
  retirement: Retirement
  retirements: Array<Retirement>
  searchProjects: Array<Project>
  transfer: Transfer
  transfers: Array<Transfer>
  verifier: Verifier
  verifiers: Array<Verifier>
  verifiersCount: AggregateCountOutput
}

export type QueryCreationArgs = {
  where?: InputMaybe<CreationWhereUniqueInput>
}

export type QueryCreationsArgs = {
  cursor?: InputMaybe<CreationWhereUniqueInput>
  distinct?: InputMaybe<Array<CreationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CreationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CreationWhereInput>
}

export type QueryInventoriesArgs = {
  cursor?: InputMaybe<InventoryWhereUniqueInput>
  distinct?: InputMaybe<Array<InventoryScalarFieldEnum>>
  orderBy?: InputMaybe<Array<InventoryOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<InventoryWhereInput>
}

export type QueryInventoriesCountArgs = {
  where?: InputMaybe<InventoryWhereInput>
}

export type QueryInventoryArgs = {
  where?: InputMaybe<InventoryWhereUniqueInput>
}

export type QueryProjectArgs = {
  where?: InputMaybe<ProjectWhereUniqueInput>
}

export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>
  searchTerm?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ProjectWhereInput>
}

export type QueryProjectsCountArgs = {
  where?: InputMaybe<ProjectWhereInput>
}

export type QueryRetirementArgs = {
  where?: InputMaybe<RetirementWhereUniqueInput>
}

export type QueryRetirementsArgs = {
  cursor?: InputMaybe<RetirementWhereUniqueInput>
  distinct?: InputMaybe<Array<RetirementScalarFieldEnum>>
  orderBy?: InputMaybe<Array<RetirementOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RetirementWhereInput>
}

export type QuerySearchProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>
  locationFilter: LocationFilterInput
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ProjectWhereInput>
}

export type QueryTransferArgs = {
  where?: InputMaybe<TransferWhereUniqueInput>
}

export type QueryTransfersArgs = {
  cursor?: InputMaybe<TransferWhereUniqueInput>
  distinct?: InputMaybe<Array<TransferScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TransferOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TransferWhereInput>
}

export type QueryVerifierArgs = {
  where?: InputMaybe<VerifierWhereUniqueInput>
}

export type QueryVerifiersArgs = {
  cursor?: InputMaybe<VerifierWhereUniqueInput>
  distinct?: InputMaybe<Array<VerifierScalarFieldEnum>>
  orderBy?: InputMaybe<Array<VerifierOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<VerifierWhereInput>
}

export type QueryVerifiersCountArgs = {
  where?: InputMaybe<VerifierWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type Retirement = {
  __typename?: 'Retirement'
  id: Scalars['Int']
  project?: Maybe<Project>
  projectId: Scalars['Int']
  quantity: Scalars['Int']
  retiree: Scalars['String']
  timestamp: Scalars['DateTime']
}

export type RetirementListRelationFilter = {
  every?: InputMaybe<RetirementWhereInput>
  none?: InputMaybe<RetirementWhereInput>
  some?: InputMaybe<RetirementWhereInput>
}

export type RetirementOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type RetirementOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  project?: InputMaybe<ProjectOrderByWithRelationInput>
  projectId?: InputMaybe<SortOrder>
  quantity?: InputMaybe<SortOrder>
  retiree?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export enum RetirementScalarFieldEnum {
  Id = 'id',
  ProjectId = 'projectId',
  Quantity = 'quantity',
  Retiree = 'retiree',
  Timestamp = 'timestamp',
}

export type RetirementWhereInput = {
  AND?: InputMaybe<Array<RetirementWhereInput>>
  NOT?: InputMaybe<Array<RetirementWhereInput>>
  OR?: InputMaybe<Array<RetirementWhereInput>>
  id?: InputMaybe<IntFilter>
  project?: InputMaybe<ProjectRelationFilter>
  projectId?: InputMaybe<IntFilter>
  quantity?: InputMaybe<IntFilter>
  retiree?: InputMaybe<StringFilter>
  timestamp?: InputMaybe<DateTimeFilter>
}

export type RetirementWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type StringListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>
  has?: InputMaybe<Scalars['String']>
  hasEvery?: InputMaybe<Array<Scalars['String']>>
  hasSome?: InputMaybe<Array<Scalars['String']>>
  isEmpty?: InputMaybe<Scalars['Boolean']>
}

export type Transfer = {
  __typename?: 'Transfer'
  from: Scalars['String']
  id: Scalars['Int']
  project?: Maybe<Project>
  projectId: Scalars['Int']
  quantity: Scalars['Int']
  timestamp: Scalars['DateTime']
  to: Scalars['String']
}

export type TransferListRelationFilter = {
  every?: InputMaybe<TransferWhereInput>
  none?: InputMaybe<TransferWhereInput>
  some?: InputMaybe<TransferWhereInput>
}

export type TransferOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type TransferOrderByWithRelationInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  project?: InputMaybe<ProjectOrderByWithRelationInput>
  projectId?: InputMaybe<SortOrder>
  quantity?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  to?: InputMaybe<SortOrder>
}

export enum TransferScalarFieldEnum {
  From = 'from',
  Id = 'id',
  ProjectId = 'projectId',
  Quantity = 'quantity',
  Timestamp = 'timestamp',
  To = 'to',
}

export type TransferWhereInput = {
  AND?: InputMaybe<Array<TransferWhereInput>>
  NOT?: InputMaybe<Array<TransferWhereInput>>
  OR?: InputMaybe<Array<TransferWhereInput>>
  from?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  project?: InputMaybe<ProjectRelationFilter>
  projectId?: InputMaybe<IntFilter>
  quantity?: InputMaybe<IntFilter>
  timestamp?: InputMaybe<DateTimeFilter>
  to?: InputMaybe<StringFilter>
}

export type TransferWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type Verifier = {
  __typename?: 'Verifier'
  active: Scalars['Boolean']
  imageUrl: Scalars['String']
  name: Scalars['String']
  projects?: Maybe<Array<Project>>
  walletAddress: Scalars['String']
}

export type VerifierListRelationFilter = {
  every?: InputMaybe<VerifierWhereInput>
  none?: InputMaybe<VerifierWhereInput>
  some?: InputMaybe<VerifierWhereInput>
}

export type VerifierOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type VerifierOrderByWithRelationInput = {
  active?: InputMaybe<SortOrder>
  imageUrl?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  projects?: InputMaybe<ProjectOrderByRelationAggregateInput>
  walletAddress?: InputMaybe<SortOrder>
}

export enum VerifierScalarFieldEnum {
  Active = 'active',
  ImageUrl = 'imageUrl',
  Name = 'name',
  WalletAddress = 'walletAddress',
}

export type VerifierWhereInput = {
  AND?: InputMaybe<Array<VerifierWhereInput>>
  NOT?: InputMaybe<Array<VerifierWhereInput>>
  OR?: InputMaybe<Array<VerifierWhereInput>>
  active?: InputMaybe<StringFilter>
  imageUrl?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  projects?: InputMaybe<ProjectListRelationFilter>
  walletAddress?: InputMaybe<StringFilter>
}

export type VerifierWhereUniqueInput = {
  walletAddress?: InputMaybe<Scalars['String']>
}

export type ProjectFragmentFragment = {
  __typename?: 'Project'
  id: number
  name: string
  about: string
  images: Array<string>
  owner: string
  lat?: number | null
  lng?: number | null
  verified?: number | null
  verifiers?: Array<{
    __typename?: 'Verifier'
    name: string
    walletAddress: string
    imageUrl: string
    active: boolean
  }> | null
}

export type ProjectsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum> | ProjectScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<ProjectWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<ProjectOrderByWithRelationInput> | ProjectOrderByWithRelationInput
  >
  where?: InputMaybe<ProjectWhereInput>
  searchTerm?: InputMaybe<Scalars['String']>
}>

export type ProjectsQuery = {
  __typename?: 'Query'
  projects: Array<{
    __typename?: 'Project'
    id: number
    name: string
    about: string
    images: Array<string>
    owner: string
    lat?: number | null
    lng?: number | null
    verified?: number | null
    verifiers?: Array<{
      __typename?: 'Verifier'
      name: string
      walletAddress: string
      imageUrl: string
      active: boolean
    }> | null
  }>
  projectsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type SearchProjectsQueryVariables = Exact<{
  locationFilter: LocationFilterInput
  where?: InputMaybe<ProjectWhereInput>
  orderBy?: InputMaybe<
    Array<ProjectOrderByWithRelationInput> | ProjectOrderByWithRelationInput
  >
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum> | ProjectScalarFieldEnum>
}>

export type SearchProjectsQuery = {
  __typename?: 'Query'
  searchProjects: Array<{
    __typename?: 'Project'
    id: number
    name: string
    about: string
    images: Array<string>
    owner: string
    lat?: number | null
    lng?: number | null
    verified?: number | null
    verifiers?: Array<{
      __typename?: 'Verifier'
      name: string
      walletAddress: string
      imageUrl: string
      active: boolean
    }> | null
  }>
}

export type InventoriesQueryVariables = Exact<{
  distinct?: InputMaybe<
    Array<InventoryScalarFieldEnum> | InventoryScalarFieldEnum
  >
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<
    Array<InventoryOrderByWithRelationInput> | InventoryOrderByWithRelationInput
  >
  where?: InputMaybe<InventoryWhereInput>
}>

export type InventoriesQuery = {
  __typename?: 'Query'
  inventories: Array<{
    __typename?: 'Inventory'
    id: number
    price: number
    balance: number
    projectId: number
    project?: { __typename?: 'Project'; id: number; name: string } | null
  }>
  inventoriesCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type VerifiersQueryVariables = Exact<{
  distinct?: InputMaybe<
    Array<VerifierScalarFieldEnum> | VerifierScalarFieldEnum
  >
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<VerifierWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<VerifierOrderByWithRelationInput> | VerifierOrderByWithRelationInput
  >
  where?: InputMaybe<VerifierWhereInput>
}>

export type VerifiersQuery = {
  __typename?: 'Query'
  verifiers: Array<{
    __typename?: 'Verifier'
    name: string
    walletAddress: string
    imageUrl: string
    active: boolean
  }>
  verifiersCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const namedOperations = {
  Query: {
    projects: 'projects',
    searchProjects: 'searchProjects',
    inventories: 'inventories',
    verifiers: 'verifiers',
  },
  Fragment: {
    ProjectFragment: 'ProjectFragment',
  },
}
export const ProjectFragmentFragmentDoc = /*#__PURE__*/ gql`
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
export const ProjectsDocument = /*#__PURE__*/ gql`
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
  ${ProjectFragmentFragmentDoc}
`

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>
export const SearchProjectsDocument = /*#__PURE__*/ gql`
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
  ${ProjectFragmentFragmentDoc}
`

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      locationFilter: // value for 'locationFilter'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useSearchProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchProjectsQuery,
    SearchProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(
    SearchProjectsDocument,
    options,
  )
}
export function useSearchProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProjectsQuery,
    SearchProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(
    SearchProjectsDocument,
    options,
  )
}
export type SearchProjectsQueryHookResult = ReturnType<
  typeof useSearchProjectsQuery
>
export type SearchProjectsLazyQueryHookResult = ReturnType<
  typeof useSearchProjectsLazyQuery
>
export type SearchProjectsQueryResult = Apollo.QueryResult<
  SearchProjectsQuery,
  SearchProjectsQueryVariables
>
export const InventoriesDocument = /*#__PURE__*/ gql`
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

/**
 * __useInventoriesQuery__
 *
 * To run a query within a React component, call `useInventoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInventoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInventoriesQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useInventoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    InventoriesQuery,
    InventoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<InventoriesQuery, InventoriesQueryVariables>(
    InventoriesDocument,
    options,
  )
}
export function useInventoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InventoriesQuery,
    InventoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<InventoriesQuery, InventoriesQueryVariables>(
    InventoriesDocument,
    options,
  )
}
export type InventoriesQueryHookResult = ReturnType<typeof useInventoriesQuery>
export type InventoriesLazyQueryHookResult = ReturnType<
  typeof useInventoriesLazyQuery
>
export type InventoriesQueryResult = Apollo.QueryResult<
  InventoriesQuery,
  InventoriesQueryVariables
>
export const VerifiersDocument = /*#__PURE__*/ gql`
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

/**
 * __useVerifiersQuery__
 *
 * To run a query within a React component, call `useVerifiersQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifiersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifiersQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVerifiersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    VerifiersQuery,
    VerifiersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<VerifiersQuery, VerifiersQueryVariables>(
    VerifiersDocument,
    options,
  )
}
export function useVerifiersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VerifiersQuery,
    VerifiersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<VerifiersQuery, VerifiersQueryVariables>(
    VerifiersDocument,
    options,
  )
}
export type VerifiersQueryHookResult = ReturnType<typeof useVerifiersQuery>
export type VerifiersLazyQueryHookResult = ReturnType<
  typeof useVerifiersLazyQuery
>
export type VerifiersQueryResult = Apollo.QueryResult<
  VerifiersQuery,
  VerifiersQueryVariables
>
