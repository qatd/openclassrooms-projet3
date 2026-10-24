import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // constructor is used to initialise the PrismaClient class
  // ConfigService here is used to gather the .env
  constructor(configService: ConfigService) {
    const adapter = new PrismaMariaDb(
      configService.getOrThrow<string>('DATABASE_URL'),
    )
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()

    // temp log to test db
    console.log('DB connected, users:', await this.user.count())
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
