import { Module } from '@nestjs/common'
import { TransfersService } from './transfers.service'
import { TransfersResolver } from './transfers.resolver'

@Module({
  providers: [TransfersResolver, TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
