import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module.js'
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js'
import { UPLOADS_DIR, UPLOADS_PREFIX } from './common/uploads.js'

async function bootstrap() {
  // NestExpressApplication: Express-specific app, needed for useStaticAssets
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // every route is served under /api (e.g. /api/auth/register)
  app.setGlobalPrefix('api')

  // the React app (Vite dev server) calls the API from another origin
  app.enableCors({ origin: 'http://localhost:5173' })

  // validates every request body against its DTO (class-validator rules)
  // whitelist: strips any property not declared in the DTO
  // transform: the controller receives the DTO with converted types (e.g. "50" -> 50 for form-data)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // every HTTP error is returned as { message: string }
  app.useGlobalFilters(new HttpExceptionFilter())

  // serves uploaded pictures as plain files (e.g. /uploads/<file name>)
  // outside /api and outside the JWT guard: an <img src> can't send a token
  app.useStaticAssets(UPLOADS_DIR, { prefix: UPLOADS_PREFIX })

  // runs onModuleDestroy hooks on shutdown signals like Ctrl+C
  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3001)
}
await bootstrap()
