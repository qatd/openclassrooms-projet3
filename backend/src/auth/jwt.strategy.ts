import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

// content of the token signed in AuthService
type JwtPayload = { sub: number }

// Passport strategy used by JwtAuthGuard
// reads and verifies the token of each request
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    // here we "configure" the extends class PassportStrategy
    super({
      // token sent by the React app as "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // same secret as the one used to sign, so a forged or modified token is rejected
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    })
  }

  // only called when the token is valid; the returned value becomes request.user
  validate(payload: JwtPayload) {
    return { id: payload.sub }
  }
}
