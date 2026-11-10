import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'

// expected fields of POST /api/rentals (multipart/form-data)
export class CreateRentalDto {
  // 255: max length of the VARCHAR column in the RENTALS table
  @ApiProperty({ example: 'Cozy house' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  // form-data sends every field as text: @Type converts "50" into 50 before validation
  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  surface: number

  @ApiProperty({ example: 120 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number

  @ApiProperty({ example: 'A nice house near the beach' })
  @IsString()
  @IsNotEmpty()
  description: string

  // for Swagger only: the file is read by FileInterceptor in the controller, not from this DTO
  @ApiProperty({ type: 'string', format: 'binary' })
  picture: Express.Multer.File
}
