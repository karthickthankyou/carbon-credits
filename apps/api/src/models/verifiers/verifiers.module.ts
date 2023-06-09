import { Module } from '@nestjs/common'
import { VerifiersService } from './verifiers.service'
import { VerifiersResolver } from './verifiers.resolver'

@Module({
  providers: [VerifiersResolver, VerifiersService],
  exports: [VerifiersService],
})
export class VerifiersModule {}
