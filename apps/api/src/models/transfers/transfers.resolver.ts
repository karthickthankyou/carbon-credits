import { Resolver, Query, Args } from '@nestjs/graphql'
import { TransfersService } from './transfers.service'
import { Transfer } from './entities/transfer.entity'
import { FindManyTransferArgs, FindUniqueTransferArgs } from './dto/find.args'

@Resolver(() => Transfer)
export class TransfersResolver {
  constructor(private readonly transfersService: TransfersService) {}

  @Query(() => [Transfer], { name: 'transfers' })
  findAll(@Args() args: FindManyTransferArgs) {
    return this.transfersService.findAll(args)
  }

  @Query(() => Transfer, { name: 'transfer' })
  findOne(@Args() args: FindUniqueTransferArgs) {
    return this.transfersService.findOne(args)
  }
}
