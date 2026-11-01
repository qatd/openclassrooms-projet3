import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { RegisterDto } from './dto/register.dto.js'

// HTTP entry point of /api/auth/* routes
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 200 instead of Nest's default 201 for POST, to match the API contract (Mockoon)
  @Post('register')
  @HttpCode(HttpStatus.OK)
  // passes the request body to register() as registerDto, shaped and validated by RegisterDto
  register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return this.authService.register(registerDto)
  }
}
