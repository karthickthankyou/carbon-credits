import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { InventoriesService } from './inventories.service'
import { Inventory } from './entities/inventory.entity'
import { FindManyInventoryArgs, FindUniqueInventoryArgs } from './dto/find.args'
import { Project } from '../projects/entities/project.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { InventoryWhereInput } from './dto/where.args'

@Resolver(() => Inventory)
export class InventoriesResolver {
  constructor(
    private readonly inventoriesService: InventoriesService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Inventory], { name: 'inventories' })
  findAll(@Args() args: FindManyInventoryArgs) {
    return this.inventoriesService.findAll(args)
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args() args: FindUniqueInventoryArgs) {
    return this.inventoriesService.findOne(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'inventoriesCount',
  })
  async inventoriesCount(
    @Args('where', { nullable: true })
    where: InventoryWhereInput,
  ) {
    const inventories = await this.prisma.inventory.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: inventories._count._all }
  }

  @ResolveField(() => Project, { nullable: true })
  project(@Parent() parent: Inventory) {
    return this.prisma.project.findUnique({
      where: { id: parent.projectId },
    })
  }
}
