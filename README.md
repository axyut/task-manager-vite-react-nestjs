  <p align="center">A<a href="http://nodejs.org" target="_blank"> Task Manager App</a> Written with NestJs And Integragted with React-Vite Front-End</p>

## NestJs Configuration

Provide Postgres Database and JWT Parameters
in .local.env file in Nestjs root folder accordingly :

```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNANE=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SYNC=
DATABASE_LOGGING=
```
```
JWT_KEY=
JWT_EXPIRE=
```

## NestJs Install Dependencies

```bash
$ npm install
```

## Run NestJs (Default Port is 3000)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api Documentation with Swagger

Visit
`localhost:3000/api`

## React Install Dependencies

```bash
$ npm install
```

## React Environment Variables

Provide Backend Configuration
in .env file in React root folder accordingly :

```
VITE_BASE_URL=
```

## Run Vite App (Default Port is 4000)

```
npm run dev
```
