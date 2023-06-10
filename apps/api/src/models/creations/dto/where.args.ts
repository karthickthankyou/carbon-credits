import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProjectRelationFilter } from 'src/models/projects/dto/where.args'

@InputType()
export class CreationWhereUniqueInput
  implements
    RestrictProperties<
      CreationWhereUniqueInput,
      Prisma.CreationWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class CreationWhereInput
  implements RestrictProperties<CreationWhereInput, Prisma.CreationWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  timestamp: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  projectId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  user: StringFilter
  @Field(() => IntFilter, { nullable: true })
  price: IntFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => ProjectRelationFilter, { nullable: true })
  project: ProjectRelationFilter

  @Field(() => [CreationWhereInput], { nullable: true })
  AND: CreationWhereInput[]
  @Field(() => [CreationWhereInput], { nullable: true })
  OR: CreationWhereInput[]
  @Field(() => [CreationWhereInput], { nullable: true })
  NOT: CreationWhereInput[]
}

@InputType()
export class CreationListRelationFilter {
  @Field(() => CreationWhereInput, { nullable: true })
  every: CreationWhereInput
  @Field(() => CreationWhereInput, { nullable: true })
  some: CreationWhereInput
  @Field(() => CreationWhereInput, { nullable: true })
  none: CreationWhereInput
}

@InputType()
export class CreationRelationFilter {
  @Field(() => CreationWhereInput, { nullable: true })
  is: CreationWhereInput
  @Field(() => CreationWhereInput, { nullable: true })
  isNot: CreationWhereInput
}
