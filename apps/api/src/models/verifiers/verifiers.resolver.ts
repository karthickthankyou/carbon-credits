import { Resolver, Query, Args } from '@nestjs/graphql'
import { VerifiersService } from './verifiers.service'
import { Verifier } from './entities/verifier.entity'
import { FindManyVerifierArgs, FindUniqueVerifierArgs } from './dto/find.args'

@Resolver(() => Verifier)
export class VerifiersResolver {
  constructor(private readonly verifiersService: VerifiersService) {}

  @Query(() => [Verifier], { name: 'verifiers' })
  findAll(@Args() args: FindManyVerifierArgs) {
    return this.verifiersService.findAll(args)
  }

  @Query(() => Verifier, { name: 'verifier' })
  findOne(@Args() args: FindUniqueVerifierArgs) {
    return this.verifiersService.findOne(args)
  }
}
