
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


##### Seeding

1. Install ORM
npm install --save @nestjs/typeorm typeorm pg
npm install --save @nestjs/jwt
npm install dotenv

2. Configure Users, Auth, Favorites

nest g resource users --no-spec
nest g resource auth --no-spec
nest g resource favorites --no-spec


3. migrations
npm run migration:create --name=users
npm run migrate