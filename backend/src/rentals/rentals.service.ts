import { Injectable, NotFoundException } from '@nestjs/common'
import { RentalDto } from './dto/rental.dto.js'
import { RentalsRepository } from './rentals.repository.js'

// business logic of rentals
@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  // wrapped in { rentals } because the front reads data.rentals (Home.tsx)
  async findAll(): Promise<{ rentals: RentalDto[] }> {
    const rentals = await this.rentalsRepository.findAll()

    return { rentals: rentals.map((rental) => new RentalDto(rental)) }
  }

  async findById(id: number): Promise<RentalDto> {
    const rental = await this.rentalsRepository.findById(id)

    // the repository returns null for an unknown id: the service turns it into a 404
    if (!rental) {
      throw new NotFoundException('Rental not found')
    }

    return new RentalDto(rental)
  }
}
