import { Injectable } from '@nestjs/common'
import {
  FindManyRetirementArgs,
  FindUniqueRetirementArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class RetirementsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyRetirementArgs) {
    return this.prisma.retirement.findMany(args)
  }

  findOne(args: FindUniqueRetirementArgs) {
    return this.prisma.retirement.findUnique(args)
  }
}
