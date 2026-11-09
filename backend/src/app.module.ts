import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { AuthModule } from './auth/auth.module.js'
import { PrismaModule } from './prisma/prisma.module.js'
import { RentalsModule } from './rentals/rentals.module.js'

@Module({
  imports: [
    // isGlobal: ConfigService (.env) is injectable everywhere without re-importing ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
