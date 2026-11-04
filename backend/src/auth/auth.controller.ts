import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { LoginDto } from './dto/login.dto.js'
import { RegisterDto } from './dto/register.dto.js'
import { Public } from './public.decorator.js'

// HTTP entry point of /api/auth/* routes
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 200 instead of Nest's default 201 for POST, to match the API contract (Mockoon)
  // here, public indicate that the route is accessible without token
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  // passes the request body to register() as registerDto, shaped and validated by RegisterDto
  register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return this.authService.register(registerDto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto)
  }
}
