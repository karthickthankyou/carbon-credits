import { Module } from '@nestjs/common'
import { CreationsService } from './creations.service'
import { CreationsResolver } from './creations.resolver'

@Module({
  providers: [CreationsResolver, CreationsService],
  exports: [CreationsService],
})
export class CreationsModule {}
