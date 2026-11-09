import type { RentalWithOwner } from '../rentals.repository.js'

// rental data sent to the client: public fields only, owner reduced to id and name
export class RentalDto {
  id: number
  name: string
  surface: number
  price: number
  picture: string | null
  description: string
  owner: { id: number; name: string }
  created_at: Date | null
  updated_at: Date | null

  constructor(rental: RentalWithOwner) {
    this.id = rental.id
    this.name = rental.name
    // DECIMAL columns are read as Prisma Decimal objects, the front expects numbers
    this.surface = rental.surface.toNumber()
    this.price = rental.price.toNumber()
    this.picture = rental.picture
    this.description = rental.description
    this.owner = { id: rental.owner.id, name: rental.owner.name }
    this.created_at = rental.created_at
    this.updated_at = rental.updated_at
  }
}
