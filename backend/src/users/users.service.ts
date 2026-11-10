import { Injectable, NotFoundException } from '@nestjs/common'
import { PublicUserDto } from './dto/public-user.dto.js'
import { UsersRepository } from './users.repository.js'

// business logic of users
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number): Promise<PublicUserDto> {
    const user = await this.usersRepository.findById(id)

    // unknown id: 404
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return new PublicUserDto(user)
  }
}
