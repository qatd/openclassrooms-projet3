import { join } from 'node:path'

// rental pictures are saved in backend/uploads/ and served at <API_URL>/uploads/<file name>
export const UPLOADS_PREFIX = '/uploads'
export const UPLOADS_DIR = join(process.cwd(), 'uploads')
