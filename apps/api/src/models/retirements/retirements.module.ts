import { Module } from '@nestjs/common'
import { RetirementsService } from './retirements.service'
import { RetirementsResolver } from './retirements.resolver'

@Module({
  providers: [RetirementsResolver, RetirementsService],
  exports: [RetirementsService],
})
export class RetirementsModule {}
