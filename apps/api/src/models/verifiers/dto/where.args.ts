import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProjectListRelationFilter } from 'src/models/projects/dto/where.args'

@InputType()
export class VerifierWhereUniqueInput
  implements
    RestrictProperties<
      VerifierWhereUniqueInput,
      Prisma.VerifierWhereUniqueInput
    >
{
  @Field(() => String, { nullable: true })
  walletAddress: string
}

@InputType()
export class VerifierWhereInput
  implements RestrictProperties<VerifierWhereInput, Prisma.VerifierWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  walletAddress: StringFilter
  @Field(() => StringFilter, { nullable: true })
  imageUrl: StringFilter
  @Field(() => StringFilter, { nullable: true })
  active: BoolFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => ProjectListRelationFilter, { nullable: true })
  projects: ProjectListRelationFilter

  @Field(() => [VerifierWhereInput], { nullable: true })
  AND: VerifierWhereInput[]
  @Field(() => [VerifierWhereInput], { nullable: true })
  OR: VerifierWhereInput[]
  @Field(() => [VerifierWhereInput], { nullable: true })
  NOT: VerifierWhereInput[]
}

@InputType()
export class VerifierListRelationFilter {
  @Field(() => VerifierWhereInput, { nullable: true })
  every: VerifierWhereInput
  @Field(() => VerifierWhereInput, { nullable: true })
  some: VerifierWhereInput
  @Field(() => VerifierWhereInput, { nullable: true })
  none: VerifierWhereInput
}

@InputType()
export class VerifierRelationFilter {
  @Field(() => VerifierWhereInput, { nullable: true })
  is: VerifierWhereInput
  @Field(() => VerifierWhereInput, { nullable: true })
  isNot: VerifierWhereInput
}
