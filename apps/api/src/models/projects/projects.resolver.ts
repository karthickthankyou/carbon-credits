import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProjectsService } from './projects.service'
import { Project } from './entities/project.entity'
import { FindManyProjectArgs, FindUniqueProjectArgs } from './dto/find.args'

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project], { name: 'projects' })
  findAll(@Args() args: FindManyProjectArgs) {
    return this.projectsService.findAll(args)
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args() args: FindUniqueProjectArgs) {
    return this.projectsService.findOne(args)
  }
}
