import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
  StringListFilter,
} from 'src/common/dtos/common.input'
import { CreationListRelationFilter } from 'src/models/creations/dto/where.args'
import { InventoryListRelationFilter } from 'src/models/inventories/dto/where.args'
import { RetirementListRelationFilter } from 'src/models/retirements/dto/where.args'
import { TransferListRelationFilter } from 'src/models/transfers/dto/where.args'
import { VerifierListRelationFilter } from 'src/models/verifiers/dto/where.args'

@InputType()
export class ProjectWhereUniqueInput
  implements
    RestrictProperties<ProjectWhereUniqueInput, Prisma.ProjectWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ProjectWhereInput
  implements RestrictProperties<ProjectWhereInput, Prisma.ProjectWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  about: StringFilter
  @Field(() => StringListFilter, { nullable: true })
  images: StringListFilter
  @Field(() => CreationListRelationFilter, { nullable: true })
  creations: CreationListRelationFilter
  @Field(() => FloatFilter, { nullable: true })
  lat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  lng: FloatFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  owner: StringFilter
  @Field(() => VerifierListRelationFilter, { nullable: true })
  verifiers: VerifierListRelationFilter
  @Field(() => InventoryListRelationFilter, { nullable: true })
  inventories: InventoryListRelationFilter
  @Field(() => TransferListRelationFilter, { nullable: true })
  transfers: TransferListRelationFilter
  @Field(() => RetirementListRelationFilter, { nullable: true })
  retirements: RetirementListRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [ProjectWhereInput], { nullable: true })
  AND: ProjectWhereInput[]
  @Field(() => [ProjectWhereInput], { nullable: true })
  OR: ProjectWhereInput[]
  @Field(() => [ProjectWhereInput], { nullable: true })
  NOT: ProjectWhereInput[]
}

@InputType()
export class ProjectListRelationFilter {
  @Field(() => ProjectWhereInput, { nullable: true })
  every: ProjectWhereInput
  @Field(() => ProjectWhereInput, { nullable: true })
  some: ProjectWhereInput
  @Field(() => ProjectWhereInput, { nullable: true })
  none: ProjectWhereInput
}

@InputType()
export class ProjectRelationFilter {
  @Field(() => ProjectWhereInput, { nullable: true })
  is: ProjectWhereInput
  @Field(() => ProjectWhereInput, { nullable: true })
  isNot: ProjectWhereInput
}
