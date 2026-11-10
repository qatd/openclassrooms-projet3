import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'

// expected text fields of POST /api/rentals (multipart/form-data)
// the picture file is not part of the body: it is read by FileInterceptor in the controller
export class CreateRentalDto {
  // 255: max length of the VARCHAR column in the RENTALS table
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  // form-data sends every field as text: @Type converts "50" into 50 before validation
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  surface: number

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  @IsNotEmpty()
  description: string
}
