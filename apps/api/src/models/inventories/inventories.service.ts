import { Injectable } from '@nestjs/common'
import { FindManyInventoryArgs, FindUniqueInventoryArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class InventoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyInventoryArgs) {
    return this.prisma.inventory.findMany(args)
  }

  findOne(args: FindUniqueInventoryArgs) {
    return this.prisma.inventory.findUnique(args)
  }
}
