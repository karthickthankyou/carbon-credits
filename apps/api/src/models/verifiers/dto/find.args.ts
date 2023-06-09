import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { VerifierOrderByWithRelationInput } from './orderBy.args'
import { VerifierWhereInput, VerifierWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.VerifierScalarFieldEnum, {
  name: 'VerifierScalarFieldEnum',
})

@ArgsType()
export class FindManyVerifierArgs
  implements
    RestrictProperties<
      FindManyVerifierArgs,
      Omit<Prisma.VerifierFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => VerifierWhereInput, { nullable: true })
  where: VerifierWhereInput
  @Field(() => [VerifierOrderByWithRelationInput], { nullable: true })
  orderBy: VerifierOrderByWithRelationInput[]
  @Field(() => VerifierWhereUniqueInput, { nullable: true })
  cursor: VerifierWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.VerifierScalarFieldEnum], { nullable: true })
  distinct: Prisma.VerifierScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueVerifierArgs {
  @Field({ nullable: true })
  where: VerifierWhereUniqueInput
}
