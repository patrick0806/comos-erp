# Cosmos ERP

## Project status: In Development

The api of a virtual store erp, integrated with the main sales platforms.

# API Development Process

This project is based on [NestJS](https://docs.nestjs.com/)

To running this project in dev mode you need threee things:

1. install dependences
2. Configure a local database
3. Run the app

These three steps are covered in sequence below

## Installation

```bash
yarn
```

## The Database (PostgreSQL)

#### Create database

```bash
  docker run --name cosmo \
    -p 5432:5432 \
    -e POSTGRES_DB=cosmo \
    -e POSTGRES_USER=cosmo \
    -e POSTGRES_PASSWORD=123 \
    -d postgres:14.4-alpine
```

#### Stop Database

```bash
docker stop digituz-dashboard-postgres
```

#### Remove database

```bash
docker rm digituz-dashboard-postgres
```

## Running the app

First, you need create a `.env` file at the project root:

you can find de env values in this doc https://docs.google.com/document/d/1Nb6XZR1_HXKujTfIMztVG-qGk1qsKxTZ6-aVKL8bKn0/edit?usp=sharing

Then, you can run as follows:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

# Reflection

I created this project to see what it would be like to start a product project from scratch, where I would have to make all the decisions and choose what to use, and come to understand more about integrations with other apis such as payment gateways.

I still don't know how long this project will take to finish but I want to add some things to it as a study, to give a proper focus on them which are:

- Documentation (Swagger)
- TDD
- Tests (unitary/integration)
- Using S3(AWS)
- CI/CD
- Logs and monitorin

## Swagger route is http://localhost:3005/api-docs
