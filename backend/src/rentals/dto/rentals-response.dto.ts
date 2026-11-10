import { ApiProperty } from '@nestjs/swagger'
import { RentalDto } from './rental.dto.js'

// body returned by GET /api/rentals
export class RentalsResponseDto {
  @ApiProperty({ type: [RentalDto] })
  rentals: RentalDto[]
}
