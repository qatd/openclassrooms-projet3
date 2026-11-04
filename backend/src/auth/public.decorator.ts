import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

// marks a route as accessible without a token (read by JwtAuthGuard)
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
