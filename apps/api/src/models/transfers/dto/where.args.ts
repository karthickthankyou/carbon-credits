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
export class TransferWhereUniqueInput
  implements
    RestrictProperties<
      TransferWhereUniqueInput,
      Prisma.TransferWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class TransferWhereInput
  implements RestrictProperties<TransferWhereInput, Prisma.TransferWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  timestamp: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  projectId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  from: StringFilter
  @Field(() => StringFilter, { nullable: true })
  to: StringFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => ProjectRelationFilter, { nullable: true })
  project: ProjectRelationFilter

  @Field(() => [TransferWhereInput], { nullable: true })
  AND: TransferWhereInput[]
  @Field(() => [TransferWhereInput], { nullable: true })
  OR: TransferWhereInput[]
  @Field(() => [TransferWhereInput], { nullable: true })
  NOT: TransferWhereInput[]
}

@InputType()
export class TransferListRelationFilter {
  @Field(() => TransferWhereInput, { nullable: true })
  every: TransferWhereInput
  @Field(() => TransferWhereInput, { nullable: true })
  some: TransferWhereInput
  @Field(() => TransferWhereInput, { nullable: true })
  none: TransferWhereInput
}

@InputType()
export class TransferRelationFilter {
  @Field(() => TransferWhereInput, { nullable: true })
  is: TransferWhereInput
  @Field(() => TransferWhereInput, { nullable: true })
  isNot: TransferWhereInput
}
