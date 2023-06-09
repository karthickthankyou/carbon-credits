import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { InventoryOrderByWithRelationInput } from './orderBy.args'
import { InventoryWhereInput, InventoryWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.InventoryScalarFieldEnum, {
  name: 'InventoryScalarFieldEnum',
})

@ArgsType()
export class FindManyInventoryArgs
  implements
    RestrictProperties<
      FindManyInventoryArgs,
      Omit<Prisma.InventoryFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => InventoryWhereInput, { nullable: true })
  where: InventoryWhereInput
  @Field(() => [InventoryOrderByWithRelationInput], { nullable: true })
  orderBy: InventoryOrderByWithRelationInput[]
  @Field(() => InventoryWhereUniqueInput, { nullable: true })
  cursor: InventoryWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.InventoryScalarFieldEnum], { nullable: true })
  distinct: Prisma.InventoryScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueInventoryArgs {
  @Field({ nullable: true })
  where: InventoryWhereUniqueInput
}
