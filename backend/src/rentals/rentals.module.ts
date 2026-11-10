import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module.js'
import { RentalsController } from './rentals.controller.js'
import { RentalsRepository } from './rentals.repository.js'
import { RentalsService } from './rentals.service.js'

@Module({
  imports: [PrismaModule],
  controllers: [RentalsController],
  providers: [RentalsService, RentalsRepository],
  // used by MessagesModule
  exports: [RentalsRepository],
})
export class RentalsModule {}
