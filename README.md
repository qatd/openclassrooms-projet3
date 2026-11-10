# ChâTop – Portail de location saisonnière

Application full-stack TypeScript qui met en relation locataires et propriétaires :

- `frontend/` : application React (fournie)
- `backend/` : API REST NestJS + Prisma (MySQL), sécurisée par JWT

## Prérequis

- **Node.js** 22.12 ou supérieur
- **pnpm** (back-end) et **npm** (front-end)
- **MySQL** 8+ (ou MariaDB 10.5+)

## 1. Base de données

Le script crée la base `chatop_db` et ses tables (`USERS`, `RENTALS`, `MESSAGES`) :

```bash
mysql -u root -p < ressources/sql/schema.sql
```

Créer ensuite un utilisateur dédié à l'application, limité à la lecture et à l'écriture des données de `chatop_db` (le compte `root` ne sert qu'à l'installation) :

```sql
-- à exécuter dans : mysql -u root -p
CREATE USER 'chatop'@'localhost' IDENTIFIED BY '<mot_de_passe>';
GRANT SELECT, INSERT, UPDATE, DELETE ON chatop_db.* TO 'chatop'@'localhost';
```

## 2. Back-end

### Installation

```bash
cd backend
pnpm install
```

### Configuration

Créer un fichier `backend/.env` (non versionné) :

```env
DATABASE_URL="mysql://chatop:<mot_de_passe>@localhost:3306/chatop_db"
JWT_SECRET="<chaîne secrète longue et aléatoire>"
JWT_EXPIRES_IN="1d"
API_URL="http://localhost:3001"
```

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion à la base MySQL, avec l'utilisateur `chatop` créé à l'étape 1 |
| `JWT_SECRET` | Clé de signature des tokens JWT |
| `JWT_EXPIRES_IN` | Durée de validité d'un token (ex. `1h`, `1d`) |
| `API_URL` | Adresse publique de l'API, utilisée pour construire l'URL des images uploadées |
| `PORT` | Optionnel, `3001` par défaut |

Générer ensuite le client Prisma à partir de `prisma/schema.prisma` :

```bash
pnpm exec prisma generate
```

### Lancement

```bash
pnpm start:dev                  # développement (rechargement automatique)
pnpm build && pnpm start:prod   # production
```

## 3. Front-end

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173).

## Documentation de l'API (Swagger)

La documentation de toutes les routes est disponible sur **[http://localhost:3001/api/docs](http://localhost:3001/api/docs)** (back-end lancé).

Elle est accessible sans token. Pour tester les routes protégées :

1. Appeler `POST /api/auth/login` (ou `register`) et copier le `token` renvoyé.
2. Cliquer sur **Authorize** et coller le token.
