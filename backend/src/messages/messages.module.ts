import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module.js'
import { RentalsModule } from '../rentals/rentals.module.js'
import { MessagesController } from './messages.controller.js'
import { MessagesRepository } from './messages.repository.js'
import { MessagesService } from './messages.service.js'

@Module({
  // RentalsModule: provides RentalsRepository to check the rental exists
  imports: [PrismaModule, RentalsModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
