import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { InventoriesModule } from './models/inventories/inventories.module'
import { ProjectsModule } from './models/projects/projects.module'
import { RetirementsModule } from './models/retirements/retirements.module'
import { TransfersModule } from './models/transfers/transfers.module'
import { VerifiersModule } from './models/verifiers/verifiers.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { CeloModule } from './celo/celo.module'
import { MeilisearchModule } from './meilisearch/meilisearch.module'
import { CreationsModule } from './models/creations/creations.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),

    PrismaModule,
    CeloModule,
    MeilisearchModule,

    InventoriesModule,
    ProjectsModule,
    RetirementsModule,
    TransfersModule,
    VerifiersModule,
    CreationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
