import { Injectable } from '@nestjs/common'
import { FindManyProjectArgs, FindUniqueProjectArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { MeilisearchService } from 'src/meilisearch/meilisearch.service'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeilisearchService,
  ) {}

  async findAll(
    { cursor, distinct, orderBy, skip, take, where }: FindManyProjectArgs,
    searchTerm?: string,
  ) {
    if (searchTerm && searchTerm.trim() !== '') {
      const searchResults = await this.meili.search({
        query: searchTerm,
        limit: 10,
      })
      const ids = searchResults.hits.map((hit) => hit.id)
      return this.prisma.project.findMany({
        orderBy,
        where: { ...where, id: { in: ids } },
      })
    } else {
      return this.prisma.project.findMany({
        cursor,
        distinct,
        orderBy,
        skip,
        take,
        where,
      })
    }
  }

  findOne(args: FindUniqueProjectArgs) {
    return this.prisma.project.findUnique(args)
  }
}
