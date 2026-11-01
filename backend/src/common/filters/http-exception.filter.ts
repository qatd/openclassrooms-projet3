import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import type { Response } from 'express'

// formats every HTTP error as { message: string }, the shape the React app displays
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    // body of the exception: a string, or an object like { statusCode, message, error }
    const body = exception.getResponse()
    const message =
      typeof body === 'object' && 'message' in body
        ? body.message
        : exception.message

    // ValidationPipe returns one message per invalid field (array): join them into one string
    response.status(exception.getStatus()).json({
      message: Array.isArray(message) ? message.join(', ') : message,
    })
  }
}
