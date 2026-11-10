import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator'

// expected body of POST /api/auth/register, checked by the global ValidationPipe
export class RegisterDto {
  // 255: max length of the VARCHAR columns in the USERS table
  @ApiProperty({ example: 'Test User' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  @MaxLength(255)
  email: string

  @ApiProperty({
    example: 'Str0ng!Pass',
    description:
      'At least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
  })
  @IsString()
  @IsStrongPassword()
  @MaxLength(72)
  password: string
}
