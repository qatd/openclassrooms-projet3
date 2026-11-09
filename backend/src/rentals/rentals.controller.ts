import { Controller, Get } from '@nestjs/common'
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
}
