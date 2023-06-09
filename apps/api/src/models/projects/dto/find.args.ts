import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ProjectOrderByWithRelationInput } from './orderBy.args'
import { ProjectWhereInput, ProjectWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ProjectScalarFieldEnum, {
  name: 'ProjectScalarFieldEnum',
})

@ArgsType()
export class FindManyProjectArgs
  implements
    RestrictProperties<
      FindManyProjectArgs,
      Omit<Prisma.ProjectFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ProjectWhereInput, { nullable: true })
  where: ProjectWhereInput
  @Field(() => [ProjectOrderByWithRelationInput], { nullable: true })
  orderBy: ProjectOrderByWithRelationInput[]
  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  cursor: ProjectWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ProjectScalarFieldEnum], { nullable: true })
  distinct: Prisma.ProjectScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueProjectArgs {
  @Field({ nullable: true })
  where: ProjectWhereUniqueInput
}
