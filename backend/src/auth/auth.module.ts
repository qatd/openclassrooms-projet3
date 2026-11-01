import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, type JwtSignOptions } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module.js'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'

@Module({
  imports: [
    UsersModule,
    // registerAsync: the JWT config is read from .env (via ConfigService) when the app starts
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
  providers: [AuthService],
})
export class AuthModule {}
