import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'https://carbon-credits-web.vercel.app',
      'https://carbon-credits.iamkarthick.com',
      'https://studio.apollographql.com',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })
  await app.listen(3000)
}
bootstrap()
