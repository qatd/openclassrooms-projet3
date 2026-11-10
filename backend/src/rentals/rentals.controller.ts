import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { CreateRentalDto } from './dto/create-rental.dto.js'
import { RentalDto } from './dto/rental.dto.js'
import { RentalsResponseDto } from './dto/rentals-response.dto.js'
import { UpdateRentalDto } from './dto/update-rental.dto.js'
import { RentalsService } from './rentals.service.js'

// shared by POST and PUT: multer rejects files over 5 MB (413)
const PictureInterceptor = FileInterceptor('picture', {
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
})

// jpeg/png/webp only, checked on the file content (400)
const pictureValidation = (fileIsRequired: boolean) =>
  new ParseFilePipe({
    fileIsRequired,
    validators: [
      new FileTypeValidator({
        fileType: /^image\/(jpeg|png|webp)$/,
        overrideMimeType: true,
      }),
    ],
  })

// no @Public(): every route requires a JWT
@ApiTags('rentals')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiOkResponse({ type: RentalsResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  findAll(): Promise<{ rentals: RentalDto[] }> {
    return this.rentalsService.findAll()
  }

  // ParseIntPipe: 400 if :id isn't a number
  @Get(':id')
  @ApiOperation({ summary: 'Get a rental by id' })
  @ApiOkResponse({ type: RentalDto })
  @ApiBadRequestResponse({ description: 'id is not a number' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @ApiNotFoundResponse({ description: 'Rental not found' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<RentalDto> {
    return this.rentalsService.findById(id)
  }

  // picture required, 201 by default
  @Post()
  @UseInterceptors(PictureInterceptor)
  @ApiOperation({ summary: 'Create a rental (owner = logged-in user)' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ schema: { example: { message: 'Rental created!' } } })
  @ApiBadRequestResponse({
    description: 'Invalid body, or picture missing or not jpeg/png/webp',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @ApiPayloadTooLargeResponse({ description: 'Picture over 5 MB' })
  create(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile(pictureValidation(true)) picture: Express.Multer.File,
    @Req() request: Request & { user: { id: number } },
  ): Promise<{ message: string }> {
    return this.rentalsService.create(createRentalDto, picture, request.user.id)
  }

  // every field optional (picture too), 200 by default
  @Put(':id')
  @UseInterceptors(PictureInterceptor)
  @ApiOperation({ summary: 'Update a rental (owner only)' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ schema: { example: { message: 'Rental updated!' } } })
  @ApiBadRequestResponse({
    description: 'Invalid body or picture not jpeg/png/webp',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @ApiForbiddenResponse({ description: 'Not the owner of the rental' })
  @ApiNotFoundResponse({ description: 'Rental not found' })
  @ApiPayloadTooLargeResponse({ description: 'Picture over 5 MB' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalDto: UpdateRentalDto,
    @UploadedFile(pictureValidation(false))
    picture: Express.Multer.File | undefined,
    @Req() request: Request & { user: { id: number } },
  ): Promise<{ message: string }> {
    return this.rentalsService.update(
      id,
      updateRentalDto,
      picture,
      request.user.id,
    )
  }
}
