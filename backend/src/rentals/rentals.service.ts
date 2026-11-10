import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UPLOADS_DIR, UPLOADS_PREFIX } from '../common/uploads.js'
import { CreateRentalDto } from './dto/create-rental.dto.js'
import { RentalDto } from './dto/rental.dto.js'
import { UpdateRentalDto } from './dto/update-rental.dto.js'
import { RentalsRepository } from './rentals.repository.js'

// business logic of rentals
@Injectable()
export class RentalsService {
  // base URL used to build picture URLs
  private readonly apiUrl: string

  constructor(
    private readonly rentalsRepository: RentalsRepository,
    configService: ConfigService,
  ) {
    this.apiUrl = configService.getOrThrow<string>('API_URL')
  }

  // wrapped: the front reads data.rentals
  async findAll(): Promise<{ rentals: RentalDto[] }> {
    const rentals = await this.rentalsRepository.findAll()

    return { rentals: rentals.map((rental) => new RentalDto(rental)) }
  }

  async findById(id: number): Promise<RentalDto> {
    const rental = await this.rentalsRepository.findById(id)

    // unknown id: 404
    if (!rental) {
      throw new NotFoundException('Rental not found')
    }

    return new RentalDto(rental)
  }

  // owner taken from the JWT, never from the client
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

  // only the owner can update
  async update(
    id: number,
    updateRentalDto: UpdateRentalDto,
    picture: Express.Multer.File | undefined,
    userId: number,
  ): Promise<{ message: string }> {
    const rental = await this.rentalsRepository.findById(id)

    if (!rental) {
      throw new NotFoundException('Rental not found')
    }

    if (rental.owner_id !== userId) {
      throw new ForbiddenException('You can only update your own rentals')
    }

    // fields not sent stay undefined: Prisma keeps them unchanged
    await this.rentalsRepository.update(id, {
      name: updateRentalDto.name,
      surface: updateRentalDto.surface,
      price: updateRentalDto.price,
      description: updateRentalDto.description,
      picture: picture ? await this.savePicture(picture) : undefined,
    })

    return { message: 'Rental updated!' }
  }

  // saves the file on disk and returns its public URL
  private async savePicture(picture: Express.Multer.File): Promise<string> {
    // random name, extension from the detected mimetype
    const fileName = `${randomUUID()}.${picture.mimetype.split('/')[1]}`

    await mkdir(UPLOADS_DIR, { recursive: true })
    await writeFile(join(UPLOADS_DIR, fileName), picture.buffer)

    return `${this.apiUrl}${UPLOADS_PREFIX}/${fileName}`
  }
}
