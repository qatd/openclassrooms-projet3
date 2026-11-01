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
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsEmail()
  @MaxLength(255)
  email: string

  @IsString()
  @IsStrongPassword()
  @MaxLength(72)
  password: string
}
