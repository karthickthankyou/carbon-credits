import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RetirementsService } from './retirements.service'
import { Retirement } from './entities/retirement.entity'
import {
  FindManyRetirementArgs,
  FindUniqueRetirementArgs,
} from './dto/find.args'

@Resolver(() => Retirement)
export class RetirementsResolver {
  constructor(private readonly retirementsService: RetirementsService) {}

  @Mutation(() => Retirement)
  @Query(() => [Retirement], { name: 'retirements' })
  findAll(@Args() args: FindManyRetirementArgs) {
    return this.retirementsService.findAll(args)
  }

  @Query(() => Retirement, { name: 'retirement' })
  findOne(@Args() args: FindUniqueRetirementArgs) {
    return this.retirementsService.findOne(args)
  }
}
