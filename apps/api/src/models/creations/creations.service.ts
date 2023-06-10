import { Injectable } from '@nestjs/common'
import { FindManyCreationArgs, FindUniqueCreationArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class CreationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyCreationArgs) {
    return this.prisma.creation.findMany(args)
  }

  findOne(args: FindUniqueCreationArgs) {
    return this.prisma.creation.findUnique(args)
  }
}
