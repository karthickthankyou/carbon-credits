import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InventoriesService } from './inventories.service'
import { Inventory } from './entities/inventory.entity'
import { FindManyInventoryArgs, FindUniqueInventoryArgs } from './dto/find.args'

@Resolver(() => Inventory)
export class InventoriesResolver {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Query(() => [Inventory], { name: 'inventories' })
  findAll(@Args() args: FindManyInventoryArgs) {
    return this.inventoriesService.findAll(args)
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args() args: FindUniqueInventoryArgs) {
    return this.inventoriesService.findOne(args)
  }
}
