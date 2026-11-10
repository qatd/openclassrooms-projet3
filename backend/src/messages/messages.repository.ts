import { Injectable } from '@nestjs/common'
import type { Message, Prisma } from '../generated/prisma/client.js'
import { PrismaService } from '../prisma/prisma.service.js'

// data access layer for the MESSAGES table
@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // "Unchecked": rental and user set by their ids
  create(data: Prisma.MessageUncheckedCreateInput): Promise<Message> {
    return this.prisma.message.create({ data })
  }
}
