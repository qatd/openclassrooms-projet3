// from @nestjs/swagger (not mapped-types): also copies the Swagger metadata
import { PartialType } from '@nestjs/swagger'
import { CreateRentalDto } from './create-rental.dto.js'

// same rules as CreateRentalDto, every field optional
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}
