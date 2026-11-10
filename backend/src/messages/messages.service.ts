import { Injectable, NotFoundException } from '@nestjs/common'
import { RentalsRepository } from '../rentals/rentals.repository.js'
import { CreateMessageDto } from './dto/create-message.dto.js'
import { MessagesRepository } from './messages.repository.js'

// business logic of messages
@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly rentalsRepository: RentalsRepository,
  ) {}

  // sender taken from the JWT, never from the client
  async create(
    createMessageDto: CreateMessageDto,
    userId: number,
  ): Promise<{ message: string }> {
    const rental = await this.rentalsRepository.findById(
      createMessageDto.rental_id,
    )

    // unknown rental: 404
    if (!rental) {
      throw new NotFoundException('Rental not found')
    }

    await this.messagesRepository.create({
      rental_id: createMessageDto.rental_id,
      user_id: userId,
      message: createMessageDto.message,
    })

    return { message: 'Message sent!' }
  }
}
