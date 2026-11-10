import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator'

// user_id sent by the front is not declared: whitelist strips it
export class CreateMessageDto {
  @IsInt()
  @IsPositive()
  rental_id: number

  @IsString()
  @IsNotEmpty()
  message: string
}
