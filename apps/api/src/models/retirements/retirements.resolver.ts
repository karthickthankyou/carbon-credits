import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { RetirementsService } from './retirements.service'
import { Retirement } from './entities/retirement.entity'
import {
  FindManyRetirementArgs,
  FindUniqueRetirementArgs,
} from './dto/find.args'
import { Project } from '../projects/entities/project.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Retirement)
export class RetirementsResolver {
  constructor(
    private readonly retirementsService: RetirementsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Retirement)
  @Query(() => [Retirement], { name: 'retirements' })
  findAll(@Args() args: FindManyRetirementArgs) {
    return this.retirementsService.findAll(args)
  }

  @Query(() => Retirement, { name: 'retirement' })
  findOne(@Args() args: FindUniqueRetirementArgs) {
    return this.retirementsService.findOne(args)
  }

  @ResolveField(() => Project, { nullable: true })
  project(@Parent() parent: Retirement) {
    return this.prisma.project.findUnique({
      where: { id: parent.projectId },
    })
  }
}
