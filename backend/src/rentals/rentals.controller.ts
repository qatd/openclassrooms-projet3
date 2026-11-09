import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { RentalDto } from './dto/rental.dto.js'
import { RentalsService } from './rentals.service.js'

// HTTP entry point of /api/rentals/* routes
// no @Public(): every route here requires a valid JWT (global JwtAuthGuard)
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  findAll(): Promise<{ rentals: RentalDto[] }> {
    return this.rentalsService.findAll()
  }

  // :id arrives as a string in the URL, ParseIntPipe converts it to a number
  // (or responds 400 if it isn't a number, e.g. /api/rentals/abc)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<RentalDto> {
    return this.rentalsService.findById(id)
  }
}
