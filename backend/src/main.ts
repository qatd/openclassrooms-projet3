import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // runs onModuleDestroy hooks on shutdown signals like Ctrl+C
  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
