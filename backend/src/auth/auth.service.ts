import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../users/users.repository.js'
import { RegisterDto } from './dto/register.dto.js'

// cost factor of bcrypt: each +1 doubles the hashing time (slows down brute force)
const SALT_ROUNDS = 12

// business logic of authentication
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    name,
    email,
    password,
  }: RegisterDto): Promise<{ token: string }> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new BadRequestException('Email already exists')
    }

    // the password is never stored in plain text, only its bcrypt hash
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    // sub (subject): standard JWT claim identifying the user
    return { token: await this.jwtService.signAsync({ sub: user.id }) }
  }
}
