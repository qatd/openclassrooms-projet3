import { ApiProperty } from '@nestjs/swagger'
import type { RentalWithOwner } from '../rentals.repository.js'

// rental data sent to the client: public fields only, owner reduced to id and name
export class RentalDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Cozy house' })
  name: string

  @ApiProperty({ example: 50 })
  surface: number

  @ApiProperty({ example: 120 })
  price: number

  // unions (x | null) are not readable by Swagger: the type is given explicitly
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'http://localhost:3001/uploads/<uuid>.jpg',
  })
  picture: string | null

  @ApiProperty({ example: 'A nice house near the beach' })
  description: string

  @ApiProperty({ example: { id: 1, name: 'Test User' } })
  owner: { id: number; name: string }

  @ApiProperty({
    type: Date,
    nullable: true,
    example: '2026-11-10T12:00:00.000Z',
  })
  created_at: Date | null

  @ApiProperty({
    type: Date,
    nullable: true,
    example: '2026-11-10T12:00:00.000Z',
  })
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
