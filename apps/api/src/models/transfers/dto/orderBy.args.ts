import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProjectOrderByWithRelationInput } from 'src/models/projects/dto/orderBy.args'

@InputType()
export class TransferOrderByWithRelationInput
  implements
    RestrictProperties<
      TransferOrderByWithRelationInput,
      Prisma.TransferOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  projectId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  from: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  to: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => ProjectOrderByWithRelationInput, { nullable: true })
  project: ProjectOrderByWithRelationInput
}

@InputType()
export class TransferOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
