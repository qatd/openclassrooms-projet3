import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { App } from 'supertest/types.js'
import { AppModule } from './../src/app.module.js'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // every route requires a JWT, except the ones marked @Public()
  it('/ (GET) without token', () => {
    return request(app.getHttpServer()).get('/').expect(401)
  })

  afterEach(async () => {
    await app.close()
  })
})
