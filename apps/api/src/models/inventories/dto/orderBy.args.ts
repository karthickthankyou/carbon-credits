import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProjectOrderByWithRelationInput } from 'src/models/projects/dto/orderBy.args'

@InputType()
export class InventoryOrderByWithRelationInput
  implements
    RestrictProperties<
      InventoryOrderByWithRelationInput,
      Prisma.InventoryOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  user: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  projectId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  balance: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  price: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  forSale: Prisma.SortOrder
  @Field(() => ProjectOrderByWithRelationInput, { nullable: true })
  project: ProjectOrderByWithRelationInput
}

@InputType()
export class InventoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
