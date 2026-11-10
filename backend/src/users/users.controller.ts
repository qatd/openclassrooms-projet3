import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { PublicUserDto } from './dto/public-user.dto.js'
import { UsersService } from './users.service.js'

// "user" (singular) to match the Mockoon contract; no @Public(): JWT required
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // returns a user's public info (no email)
  // ParseIntPipe: 400 if :id isn't a number
  @Get(':id')
  @ApiOperation({ summary: "Get a user's public info (no email)" })
  @ApiOkResponse({ type: PublicUserDto })
  @ApiBadRequestResponse({ description: 'id is not a number' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @ApiNotFoundResponse({ description: 'User not found' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<PublicUserDto> {
    return this.usersService.findById(id)
  }
}
