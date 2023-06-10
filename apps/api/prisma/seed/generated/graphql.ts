/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  id: Scalars['Int']
  inventories?: Maybe<Array<Inventory>>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  name: Scalars['String']
  owner: Scalars['String']
  retirements?: Maybe<Array<Retirement>>
  transfers?: Maybe<Array<Transfer>>
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
  id?: InputMaybe<SortOrder>
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
  Id = 'id',
  Lat = 'lat',
  Lng = 'lng',
  Name = 'name',
  Owner = 'owner',
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>
  NOT?: InputMaybe<Array<ProjectWhereInput>>
  OR?: InputMaybe<Array<ProjectWhereInput>>
  id?: InputMaybe<IntFilter>
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
  address: Scalars['String']
  projects?: Maybe<Array<Project>>
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
  address?: InputMaybe<SortOrder>
  projects?: InputMaybe<ProjectOrderByRelationAggregateInput>
}

export enum VerifierScalarFieldEnum {
  Address = 'address',
}

export type VerifierWhereInput = {
  AND?: InputMaybe<Array<VerifierWhereInput>>
  NOT?: InputMaybe<Array<VerifierWhereInput>>
  OR?: InputMaybe<Array<VerifierWhereInput>>
  address?: InputMaybe<StringFilter>
  projects?: InputMaybe<ProjectListRelationFilter>
}

export type VerifierWhereUniqueInput = {
  address?: InputMaybe<Scalars['String']>
}

export type ProjectFragmentFragment = {
  __typename?: 'Project'
  id: number
  name: string
  owner: string
  verifiers?: Array<{ __typename?: 'Verifier'; address: string }> | null
} & { ' $fragmentName'?: 'ProjectFragmentFragment' }

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
  projects: Array<
    { __typename?: 'Project' } & {
      ' $fragmentRefs'?: { ProjectFragmentFragment: ProjectFragmentFragment }
    }
  >
  projectsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const ProjectFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'owner' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifiers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectFragmentFragment, unknown>
export const ProjectsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'projects' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'ProjectScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProjectWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ProjectOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProjectWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'searchTerm' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchTerm' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'searchTerm' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProjectFragment' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'owner' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifiers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>
