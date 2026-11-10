import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

// expected body of POST /api/auth/login, checked by the global ValidationPipe
export class LoginDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string

  // no length rule here: it is only compared with the stored hash
  @ApiProperty({ example: 'Str0ng!Pass' })
  @IsString()
  @IsNotEmpty()
  password: string
}
