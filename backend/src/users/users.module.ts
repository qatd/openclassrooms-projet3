import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module.js'
import { UsersRepository } from './users.repository.js'

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository],
  // makes UsersRepository injectable in the modules that import UsersModule (e.g. AuthModule)
  exports: [UsersRepository],
})
export class UsersModule {}
