import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { TransferOrderByWithRelationInput } from './orderBy.args'
import { TransferWhereInput, TransferWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.TransferScalarFieldEnum, {
  name: 'TransferScalarFieldEnum',
})

@ArgsType()
export class FindManyTransferArgs
  implements
    RestrictProperties<
      FindManyTransferArgs,
      Omit<Prisma.TransferFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => TransferWhereInput, { nullable: true })
  where: TransferWhereInput
  @Field(() => [TransferOrderByWithRelationInput], { nullable: true })
  orderBy: TransferOrderByWithRelationInput[]
  @Field(() => TransferWhereUniqueInput, { nullable: true })
  cursor: TransferWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.TransferScalarFieldEnum], { nullable: true })
  distinct: Prisma.TransferScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueTransferArgs {
  @Field({ nullable: true })
  where: TransferWhereUniqueInput
}
