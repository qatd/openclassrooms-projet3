import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  // makes PrismaService injectable in the modules that import PrismaModule
  exports: [PrismaService],
})
export class PrismaModule {}
