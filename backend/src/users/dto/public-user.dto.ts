import { ApiProperty } from '@nestjs/swagger'
import type { User } from '../../generated/prisma/client.js'

// another user's data: no email, no password
export class PublicUserDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Test User' })
  name: string

  // Date | null is a union: Swagger needs the type explicitly
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

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}
