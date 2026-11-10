import { ApiProperty } from '@nestjs/swagger'

// body returned by register and login
export class TokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string
}
