##### liste routes

| url                  | methode | description                             | params | body                                                                                 | status                       | exemple réponse                                                                                                                                                     |
| -------------------- | ------- | --------------------------------------- | ------ | ------------------------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/auth/register` | POST    | création compte                         |        | `{ name, email, password }`                                                          | 200, 400                     | 200 : `{ "token": "jwt" }`<br>400 : `{ "message": "Email already exists" }`                                                                                         |
| `/api/auth/login`    | POST    | connexion                               |        | `{ email, password }`                                                                | 200, 401                     | 200 : `{ "token": "jwt" }`<br>401 : `{ "message": "Invalid credentials" }`                                                                                          |
| `/api/auth/me`       | GET     | infos user connecté                     |        |                                                                                      | 200, 401                     | 200 : `{ id, name, email, created_at, updated_at }`<br>401 : `{ "message": "Unauthorized" }`                                                                        |
| `/api/rentals`       | GET     | liste locations                         |        |                                                                                      | 200, 401                     | 200 : `{ "rentals": [ { id, name, surface, price, picture, description, owner: { id, name }, created_at, updated_at } ] }`<br>401 : `{ "message": "Unauthorized" }` |
| `/api/rentals/:id`   | GET     | details location                        | id     |                                                                                      | 200, 400, 401, 404           | 200 : `{ id, name, surface, price, picture, description, owner: { id, name }, created_at, updated_at }`<br>404 : `{ "message": "Rental not found" }`                |
| `/api/rentals`       | POST    | créer location                          |        | form-data : `name, surface, price, picture (fichier), description`                   | 201, 400, 401, 413           | 201 : `{ "message": "Rental created!" }`<br>400 : `{ "message": "Validation error" }`                                                                               |
| `/api/rentals/:id`   | PUT     | modifier location                       | id     | form-data (tous optionnels) : `name, surface, price, picture (fichier), description` | 200, 400, 401, 403, 404, 413 | 200 : `{ "message": "Rental updated!" }`<br>404 : `{ "message": "Rental not found" }`                                                                               |
| `/api/user/:id`      | GET     | obtenir info utilisateur                | id     |                                                                                      | 200, 400, 401, 404           | 200 : `{ id, name, created_at, updated_at }`<br>404 : `{ "message": "User not found" }`                                                                             |
| `/api/messages/`     | POST    | envoyer message à propriétaire location |        | `{ rental_id, message }` (expéditeur = utilisateur du token)                         | 200, 400, 401, 404           | 200 : `{ "message": "Message sent!" }`<br>400 : `{ "message": "Validation error" }`                                                                                 |
##### authentification
- token JWT obligatoire (`Authorization: Bearer <token>`) sur toutes les routes sauf register et login
##### entité metier
- user
- rental
- message
##### dépendances
- NestJS 12 - Framework back-end
- TypeScript 6 (Strict Mode)
- Prisma - ORM pour MySQL
- Passport + JWT - Authentification
- bcrypt - Chiffrement mots de passe
- class-validator - Validation DTOs
- @nestjs/swagger - Documentation OpenAPI