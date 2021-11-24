# Calorie Tracking App

## Tech Stack
* Frontend: Next.js, React and Material UI
* Backend: Node.js, NestJS, TypeORM and PostgreSQL

## Features
* Users should be able to manage food entries
* Calorie limit warning per day
* Admin role with a simple reporting
* User authentication/authorization
* For each food entry, allow the user to enter the price and warn if the monthly limit is exceeded

## Getting Started
Prerequisite
- Docker
- Node.js 14.x.x

Frontend
1. `npm i`
2. `Adjust next.config.js`
3. `npm run start:dev`

Backend
1. `npm i`
2. Copy `.env.example` to `.env` and adjust value as needed
2. `npm run db:start`
3. `npm run start:dev`