import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { CreationOrderByRelationAggregateInput } from 'src/models/creations/dto/orderBy.args'
import { InventoryOrderByRelationAggregateInput } from 'src/models/inventories/dto/orderBy.args'
import { RetirementOrderByRelationAggregateInput } from 'src/models/retirements/dto/orderBy.args'
import { TransferOrderByRelationAggregateInput } from 'src/models/transfers/dto/orderBy.args'
import { VerifierOrderByRelationAggregateInput } from 'src/models/verifiers/dto/orderBy.args'

@InputType()
export class ProjectOrderByWithRelationInput
  implements
    RestrictProperties<
      ProjectOrderByWithRelationInput,
      Prisma.ProjectOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  about: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  images: Prisma.SortOrder
  @Field(() => CreationOrderByRelationAggregateInput, { nullable: true })
  creations: CreationOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  lat: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  lng: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  owner: Prisma.SortOrder
  @Field(() => VerifierOrderByRelationAggregateInput, { nullable: true })
  verifiers: VerifierOrderByRelationAggregateInput
  @Field(() => InventoryOrderByRelationAggregateInput, { nullable: true })
  inventories: InventoryOrderByRelationAggregateInput
  @Field(() => TransferOrderByRelationAggregateInput, { nullable: true })
  transfers: TransferOrderByRelationAggregateInput
  @Field(() => RetirementOrderByRelationAggregateInput, { nullable: true })
  retirements: RetirementOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ProjectOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
