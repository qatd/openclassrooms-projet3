import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { CreateMessageDto } from './dto/create-message.dto.js'
import { MessagesService } from './messages.service.js'

// no @Public(): JWT required
@ApiTags('messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // 200 instead of 201 to match the Mockoon contract
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send a message about a rental (sender = logged-in user)',
  })
  @ApiOkResponse({ schema: { example: { message: 'Message sent!' } } })
  @ApiBadRequestResponse({ description: 'Invalid body' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @ApiNotFoundResponse({ description: 'Rental not found' })
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: Request & { user: { id: number } },
  ): Promise<{ message: string }> {
    return this.messagesService.create(createMessageDto, request.user.id)
  }
}
