import { Injectable } from '@nestjs/common'
import { FindManyProjectArgs, FindUniqueProjectArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyProjectArgs) {
    return this.prisma.project.findMany(args)
  }

  findOne(args: FindUniqueProjectArgs) {
    return this.prisma.project.findUnique(args)
  }
}
