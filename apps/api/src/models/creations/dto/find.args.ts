import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CreationOrderByWithRelationInput } from './orderBy.args'
import { CreationWhereInput, CreationWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.CreationScalarFieldEnum, {
  name: 'CreationScalarFieldEnum',
})

@ArgsType()
export class FindManyCreationArgs
  implements
    RestrictProperties<
      FindManyCreationArgs,
      Omit<Prisma.CreationFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => CreationWhereInput, { nullable: true })
  where: CreationWhereInput
  @Field(() => [CreationOrderByWithRelationInput], { nullable: true })
  orderBy: CreationOrderByWithRelationInput[]
  @Field(() => CreationWhereUniqueInput, { nullable: true })
  cursor: CreationWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CreationScalarFieldEnum], { nullable: true })
  distinct: Prisma.CreationScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCreationArgs {
  @Field({ nullable: true })
  where: CreationWhereUniqueInput
}
