import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { VerifiersService } from './verifiers.service'
import { Verifier } from './entities/verifier.entity'
import { FindManyVerifierArgs, FindUniqueVerifierArgs } from './dto/find.args'
import { Project } from '../projects/entities/project.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Verifier)
export class VerifiersResolver {
  constructor(
    private readonly verifiersService: VerifiersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Verifier], { name: 'verifiers' })
  findAll(@Args() args: FindManyVerifierArgs) {
    return this.verifiersService.findAll(args)
  }

  @Query(() => Verifier, { name: 'verifier' })
  findOne(@Args() args: FindUniqueVerifierArgs) {
    return this.verifiersService.findOne(args)
  }

  @ResolveField(() => [Project], { nullable: true })
  projects(@Parent() parent: Verifier) {
    return this.prisma.project.findMany({
      where: { verifiers: { some: { address: parent.address } } },
    })
  }
}
