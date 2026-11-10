import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import type { Request } from 'express'
import { CreateRentalDto } from './dto/create-rental.dto.js'
import { RentalDto } from './dto/rental.dto.js'
import { RentalsService } from './rentals.service.js'

// HTTP entry point of /api/rentals/* routes
// no @Public(): every route here requires a valid JWT (global JwtAuthGuard)
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  findAll(): Promise<{ rentals: RentalDto[] }> {
    return this.rentalsService.findAll()
  }

  // :id arrives as a string in the URL, ParseIntPipe converts it to a number
  // (or responds 400 if it isn't a number, e.g. /api/rentals/abc)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<RentalDto> {
    return this.rentalsService.findById(id)
  }

  // multipart/form-data: FileInterceptor extracts the "picture" file (kept in memory),
  // the other fields go to @Body() and are validated by CreateRentalDto
  // @Post() responds 201 by default
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(
    @Body() createRentalDto: CreateRentalDto,
    // 400 if the picture is missing, larger than 5 MB, or not a jpeg/png/webp image
    // (type checked on the file content, not only on its declared mimetype)
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/,
            overrideMimeType: true,
          }),
        ],
      }),
    )
    picture: Express.Multer.File,
    @Req() request: Request & { user: { id: number } },
  ): Promise<{ message: string }> {
    return this.rentalsService.create(createRentalDto, picture, request.user.id)
  }
}
