import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module.js'
import { UsersController } from './users.controller.js'
import { UsersRepository } from './users.repository.js'
import { UsersService } from './users.service.js'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  // makes UsersRepository injectable in the modules that import UsersModule (e.g. AuthModule)
  exports: [UsersRepository],
})
export class UsersModule {}
