import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { InventoriesService } from './inventories.service'
import { Inventory } from './entities/inventory.entity'
import { FindManyInventoryArgs, FindUniqueInventoryArgs } from './dto/find.args'
import { Project } from '../projects/entities/project.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

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

  @ResolveField(() => Project, { nullable: true })
  project(@Parent() parent: Inventory) {
    return this.prisma.project.findUnique({
      where: { id: parent.projectId },
    })
  }
}
