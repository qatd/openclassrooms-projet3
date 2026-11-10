import { PartialType } from '@nestjs/mapped-types'
import { CreateRentalDto } from './create-rental.dto.js'

// same rules as CreateRentalDto, every field optional
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}
