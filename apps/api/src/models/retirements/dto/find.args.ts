import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RetirementOrderByWithRelationInput } from './orderBy.args'
import { RetirementWhereInput, RetirementWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.RetirementScalarFieldEnum, {
  name: 'RetirementScalarFieldEnum',
})

@ArgsType()
export class FindManyRetirementArgs
  implements
    RestrictProperties<
      FindManyRetirementArgs,
      Omit<Prisma.RetirementFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => RetirementWhereInput, { nullable: true })
  where: RetirementWhereInput
  @Field(() => [RetirementOrderByWithRelationInput], { nullable: true })
  orderBy: RetirementOrderByWithRelationInput[]
  @Field(() => RetirementWhereUniqueInput, { nullable: true })
  cursor: RetirementWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.RetirementScalarFieldEnum], { nullable: true })
  distinct: Prisma.RetirementScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueRetirementArgs {
  @Field({ nullable: true })
  where: RetirementWhereUniqueInput
}
