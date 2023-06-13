import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProjectOrderByRelationAggregateInput } from 'src/models/projects/dto/orderBy.args'

@InputType()
export class VerifierOrderByWithRelationInput
  implements
    RestrictProperties<
      VerifierOrderByWithRelationInput,
      Prisma.VerifierOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  walletAddress: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  imageUrl: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  active: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => ProjectOrderByRelationAggregateInput, { nullable: true })
  projects: ProjectOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class VerifierOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
