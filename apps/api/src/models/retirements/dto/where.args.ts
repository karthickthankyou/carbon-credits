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
export class RetirementWhereUniqueInput
  implements
    RestrictProperties<
      RetirementWhereUniqueInput,
      Prisma.RetirementWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class RetirementWhereInput
  implements
    RestrictProperties<RetirementWhereInput, Prisma.RetirementWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  timestamp: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  projectId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  retiree: StringFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => ProjectRelationFilter, { nullable: true })
  project: ProjectRelationFilter

  @Field(() => [RetirementWhereInput], { nullable: true })
  AND: RetirementWhereInput[]
  @Field(() => [RetirementWhereInput], { nullable: true })
  OR: RetirementWhereInput[]
  @Field(() => [RetirementWhereInput], { nullable: true })
  NOT: RetirementWhereInput[]
}

@InputType()
export class RetirementListRelationFilter {
  @Field(() => RetirementWhereInput, { nullable: true })
  every: RetirementWhereInput
  @Field(() => RetirementWhereInput, { nullable: true })
  some: RetirementWhereInput
  @Field(() => RetirementWhereInput, { nullable: true })
  none: RetirementWhereInput
}

@InputType()
export class RetirementRelationFilter {
  @Field(() => RetirementWhereInput, { nullable: true })
  is: RetirementWhereInput
  @Field(() => RetirementWhereInput, { nullable: true })
  isNot: RetirementWhereInput
}
