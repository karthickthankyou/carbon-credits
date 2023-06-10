import { Resolver, Query, Args } from '@nestjs/graphql'
import { CreationsService } from './creations.service'
import { Creation } from './entities/creation.entity'
import { FindManyCreationArgs, FindUniqueCreationArgs } from './dto/find.args'

@Resolver(() => Creation)
export class CreationsResolver {
  constructor(private readonly creationsService: CreationsService) {}

  @Query(() => [Creation], { name: 'creations' })
  findAll(@Args() args: FindManyCreationArgs) {
    return this.creationsService.findAll(args)
  }

  @Query(() => Creation, { name: 'creation' })
  findOne(@Args() args: FindUniqueCreationArgs) {
    return this.creationsService.findOne(args)
  }
}
