# Smart Search Algorithm

## Setup
   1. Clone the repository.
   2. Install dependencies:
   ```sh
   npm install
   ```
   3. Create `.env` file and add connection information for database. Use the following template:
   ```env
   POSTGRES_USER=SmartSearchUser
   POSTGRES_PASSWORD=SmartSearchPassword
   POSTGRES_DB=smart_search_db
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432

   DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
   ```
   4. (Optional) Start a PostgreSQL server using Docker ([Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) required):
   ```sh
   docker-compose up -d
   ```

## Usage
### DB Management
#### Create DB:
```sh
npm run db:create
```
#### Drop DB:
```sh
npm run db:drop
```
#### Migrate DB:
```sh
npm run db:migrate
```
#### Seed DB:
```sh
 npm run db:seed:all
```
 
### Start the application:
```sh
npm run start
```

### Run tests:
```sh
npm run test
```

### Extract Entities:
```curl
curl http://localhost:3000/extract/?q=sushi%20in%20London
```

```curl
curl http://localhost:3000/extract/?q=vegan%20Sushi%20in%20London
```

```curl
curl http://localhost:3000/extract/?q=veg%20Sushi%20in%20London
```
