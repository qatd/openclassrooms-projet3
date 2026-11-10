import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import type { Request } from 'express'
import { CreateMessageDto } from './dto/create-message.dto.js'
import { MessagesService } from './messages.service.js'

// no @Public(): JWT required
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // 200 instead of 201 to match the Mockoon contract
  @Post()
  @HttpCode(HttpStatus.OK)
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: Request & { user: { id: number } },
  ): Promise<{ message: string }> {
    return this.messagesService.create(createMessageDto, request.user.id)
  }
}
