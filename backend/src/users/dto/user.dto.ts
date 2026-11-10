import { ApiProperty } from '@nestjs/swagger'
import type { User } from '../../generated/prisma/client.js'

// user data sent to the client: copies only the public fields of the entity, never the password
export class UserDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Test User' })
  name: string

  @ApiProperty({ example: 'test@test.com' })
  email: string

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
    this.email = user.email
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}
