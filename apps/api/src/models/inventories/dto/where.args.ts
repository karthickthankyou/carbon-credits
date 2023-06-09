import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProjectRelationFilter } from 'src/models/projects/dto/where.args'

@InputType()
export class InventoryUserProjectIdCompoundUniqueInput {
  user: string
  projectId: number
}

@InputType()
export class InventoryWhereUniqueInput
  implements
    RestrictProperties<
      InventoryWhereUniqueInput,
      Prisma.InventoryWhereUniqueInput
    >
{
  @Field(() => InventoryUserProjectIdCompoundUniqueInput, { nullable: true })
  user_projectId: InventoryUserProjectIdCompoundUniqueInput
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class InventoryWhereInput
  implements
    RestrictProperties<InventoryWhereInput, Prisma.InventoryWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  user: StringFilter
  @Field(() => IntFilter, { nullable: true })
  projectId: IntFilter
  @Field(() => IntFilter, { nullable: true })
  balance: IntFilter
  @Field(() => IntFilter, { nullable: true })
  price: IntFilter
  @Field(() => BoolFilter, { nullable: true })
  forSale: BoolFilter
  @Field(() => ProjectRelationFilter, { nullable: true })
  project: ProjectRelationFilter

  @Field(() => [InventoryWhereInput], { nullable: true })
  AND: InventoryWhereInput[]
  @Field(() => [InventoryWhereInput], { nullable: true })
  OR: InventoryWhereInput[]
  @Field(() => [InventoryWhereInput], { nullable: true })
  NOT: InventoryWhereInput[]
}

@InputType()
export class InventoryListRelationFilter {
  @Field(() => InventoryWhereInput, { nullable: true })
  every: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  some: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  none: InventoryWhereInput
}

@InputType()
export class InventoryRelationFilter {
  @Field(() => InventoryWhereInput, { nullable: true })
  is: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  isNot: InventoryWhereInput
}
