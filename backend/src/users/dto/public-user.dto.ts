import type { User } from '../../generated/prisma/client.js'

// another user's data: no email, no password
export class PublicUserDto {
  id: number
  name: string
  created_at: Date | null
  updated_at: Date | null

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}
