import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator'

// user_id sent by the front is not declared: whitelist strips it
export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  rental_id: number

  @ApiProperty({ example: 'Hello, is the house available in July?' })
  @IsString()
  @IsNotEmpty()
  message: string
}
