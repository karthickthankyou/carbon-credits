import { Injectable } from '@nestjs/common'
import { FindManyVerifierArgs, FindUniqueVerifierArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class VerifiersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyVerifierArgs) {
    return this.prisma.verifier.findMany(args)
  }

  findOne(args: FindUniqueVerifierArgs) {
    return this.prisma.verifier.findUnique(args)
  }
}
