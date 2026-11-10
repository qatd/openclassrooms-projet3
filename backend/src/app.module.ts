import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js'
import { MessagesModule } from './messages/messages.module.js'
import { PrismaModule } from './prisma/prisma.module.js'
import { RentalsModule } from './rentals/rentals.module.js'

@Module({
  imports: [
    // isGlobal: ConfigService (.env) is injectable everywhere without re-importing ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    RentalsModule,
    MessagesModule,
  ],
})
export class AppModule {}
