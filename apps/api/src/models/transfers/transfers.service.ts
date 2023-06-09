import { Injectable } from '@nestjs/common'
import { FindManyTransferArgs, FindUniqueTransferArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyTransferArgs) {
    return this.prisma.transfer.findMany(args)
  }

  findOne(args: FindUniqueTransferArgs) {
    return this.prisma.transfer.findUnique(args)
  }
}
