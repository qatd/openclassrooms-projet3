import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UPLOADS_DIR, UPLOADS_PREFIX } from '../common/uploads.js'
import { CreateRentalDto } from './dto/create-rental.dto.js'
import { RentalDto } from './dto/rental.dto.js'
import { RentalsRepository } from './rentals.repository.js'

// business logic of rentals
@Injectable()
export class RentalsService {
  // public base URL of the API (e.g. http://localhost:3001), used to build picture URLs
  private readonly apiUrl: string

  constructor(
    private readonly rentalsRepository: RentalsRepository,
    configService: ConfigService,
  ) {
    this.apiUrl = configService.getOrThrow<string>('API_URL')
  }

  // wrapped in { rentals } because the front reads data.rentals (Home.tsx)
  async findAll(): Promise<{ rentals: RentalDto[] }> {
    const rentals = await this.rentalsRepository.findAll()

    return { rentals: rentals.map((rental) => new RentalDto(rental)) }
  }

  async findById(id: number): Promise<RentalDto> {
    const rental = await this.rentalsRepository.findById(id)

    // the repository returns null for an unknown id: the service turns it into a 404
    if (!rental) {
      throw new NotFoundException('Rental not found')
    }

    return new RentalDto(rental)
  }

  // the owner is the logged-in user (id from the JWT), never a value sent by the client
  async create(
    createRentalDto: CreateRentalDto,
    picture: Express.Multer.File,
    ownerId: number,
  ): Promise<{ message: string }> {
    const pictureUrl = await this.savePicture(picture)

    await this.rentalsRepository.create({
      name: createRentalDto.name,
      surface: createRentalDto.surface,
      price: createRentalDto.price,
      description: createRentalDto.description,
      picture: pictureUrl,
      owner_id: ownerId,
    })

    return { message: 'Rental created!' }
  }

  // writes the uploaded file on the server's disk and returns its public URL (stored in the database)
  private async savePicture(picture: Express.Multer.File): Promise<string> {
    // random name: avoids collisions and ignores the client's file name
    // extension from the mimetype detected by FileTypeValidator (jpeg, png or webp)
    const fileName = `${randomUUID()}.${picture.mimetype.split('/')[1]}`

    await mkdir(UPLOADS_DIR, { recursive: true })
    await writeFile(join(UPLOADS_DIR, fileName), picture.buffer)

    return `${this.apiUrl}${UPLOADS_PREFIX}/${fileName}`
  }
}
