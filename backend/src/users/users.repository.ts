import { Injectable } from '@nestjs/common'
import type { Prisma, User } from '../generated/prisma/client.js'
import { PrismaService } from '../prisma/prisma.service.js'

// data access layer: the only class that queries the USERS table
@Injectable()
export class UsersRepository {
  // create a prisma property, private (that can be used only in this class), and readonly (can't be re-assigned (this.prisma = ''))
  constructor(private readonly prisma: PrismaService) {}

  // here, promise indicate that the method returns -asynchronously- a User or null
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }
}
