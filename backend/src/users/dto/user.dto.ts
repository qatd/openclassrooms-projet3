import type { User } from '../../generated/prisma/client.js'

// user data sent to the client: copies only the public fields of the entity, never the password
export class UserDto {
  id: number
  name: string
  email: string
  created_at: Date | null
  updated_at: Date | null

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.created_at = user.created_at
    this.updated_at = user.updated_at
  }
}
