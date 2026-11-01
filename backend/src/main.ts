import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // every route is served under /api (e.g. /api/auth/register)
  app.setGlobalPrefix('api')

  // the React app (Vite dev server) calls the API from another origin
  app.enableCors({ origin: 'http://localhost:5173' })

  // validates every request body against its DTO (class-validator rules)
  // whitelist: strips any property not declared in the DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // every HTTP error is returned as { message: string }
  app.useGlobalFilters(new HttpExceptionFilter())

  // runs onModuleDestroy hooks on shutdown signals like Ctrl+C
  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3001)
}
await bootstrap()
