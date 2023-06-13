import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProjectsService } from './projects.service'
import { Project } from './entities/project.entity'
import { FindManyProjectArgs, FindUniqueProjectArgs } from './dto/find.args'
import { Verifier } from '../verifiers/entities/verifier.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Inventory } from '../inventories/entities/inventory.entity'
import { Transfer } from '../transfers/entities/transfer.entity'
import { Retirement } from '../retirements/entities/retirement.entity'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { ProjectWhereInput } from './dto/where.args'
import { LocationFilterInput } from './dto/search-filter.input'

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Project], { name: 'projects' })
  findAll(
    @Args() args: FindManyProjectArgs,
    @Args('searchTerm', { nullable: true }) searchTerm: string,
  ) {
    return this.projectsService.findAll(args, searchTerm)
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args() args: FindUniqueProjectArgs) {
    return this.projectsService.findOne(args)
  }

  @Query(() => [Project], { name: 'searchProjects' })
  async searchProjects(
    @Args('locationFilter') locationFilter: LocationFilterInput,
    @Args({ nullable: true }) args: FindManyProjectArgs,
  ) {
    const { where = {}, cursor, distinct, orderBy, skip, take } = args || {}
    const { nw_lat, nw_lng, se_lat, se_lng } = locationFilter

    return this.prisma.project.findMany({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: {
        ...where,
        lat: { lte: nw_lat, gte: se_lat },
        lng: { gte: nw_lng, lte: se_lng },
        verifiers: { some: {} },
        inventories: {
          some: {},
        },
      },
    })
  }

  @Query(() => AggregateCountOutput, {
    name: 'projectsCount',
  })
  async projectsCount(
    @Args('where', { nullable: true })
    where: ProjectWhereInput,
  ) {
    const projects = await this.prisma.project.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: projects._count._all }
  }

  @ResolveField(() => [Verifier], { nullable: true })
  verifiers(@Parent() parent: Project) {
    return this.prisma.verifier.findMany({
      where: { projects: { some: { id: parent.id } } },
    })
  }

  @ResolveField(() => Number, { nullable: true })
  verified(@Parent() parent: Project) {
    return this.prisma.verifier.count({
      where: { projects: { some: { id: parent.id } } },
    })
  }

  @ResolveField(() => [Inventory], { nullable: true })
  inventories(@Parent() parent: Project) {
    return this.prisma.inventory.findMany({
      where: { projectId: parent.id },
    })
  }

  @ResolveField(() => [Transfer], { nullable: true })
  transfers(@Parent() parent: Project) {
    return this.prisma.transfer.findMany({
      where: { projectId: parent.id },
    })
  }

  @ResolveField(() => [Retirement], { nullable: true })
  retirements(@Parent() parent: Project) {
    return this.prisma.verifier.findMany({
      where: { projects: { some: { id: parent.id } } },
    })
  }
}
