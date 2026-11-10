import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { PublicUserDto } from './dto/public-user.dto.js'
import { UsersService } from './users.service.js'

// "user" (singular) to match the Mockoon contract; no @Public(): JWT required
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ParseIntPipe: 400 if :id isn't a number
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<PublicUserDto> {
    return this.usersService.findById(id)
  }
}
