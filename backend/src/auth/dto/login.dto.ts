import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

// expected body of POST /api/auth/login, checked by the global ValidationPipe
export class LoginDto {
  @IsEmail()
  email: string

  // no length rule here: it is only compared with the stored hash
  @IsString()
  @IsNotEmpty()
  password: string
}
