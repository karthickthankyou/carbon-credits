import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { TransfersService } from './transfers.service'
import { Transfer } from './entities/transfer.entity'
import { FindManyTransferArgs, FindUniqueTransferArgs } from './dto/find.args'
import { Project } from '../projects/entities/project.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Transfer)
export class TransfersResolver {
  constructor(
    private readonly transfersService: TransfersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Transfer], { name: 'transfers' })
  findAll(@Args() args: FindManyTransferArgs) {
    return this.transfersService.findAll(args)
  }

  @Query(() => Transfer, { name: 'transfer' })
  findOne(@Args() args: FindUniqueTransferArgs) {
    return this.transfersService.findOne(args)
  }

  @ResolveField(() => Project, { nullable: true })
  project(@Parent() parent: Transfer) {
    return this.prisma.project.findUnique({
      where: { id: parent.projectId },
    })
  }
}
