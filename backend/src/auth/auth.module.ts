import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule, type JwtSignOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { JwtAuthGuard } from './jwt-auth.guard.js'
import { JwtStrategy } from './jwt.strategy.js'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // reading the jwt secret and expiracy from .env via config service
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:
            configService.getOrThrow<JwtSignOptions['expiresIn']>(
              'JWT_EXPIRES_IN',
            ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // APP_GUARD: JwtAuthGuard protects every route of the app, not only this module's
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
