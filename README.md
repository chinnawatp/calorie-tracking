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

![Screen Shot 2564-11-24 at 09 14 02](https://user-images.githubusercontent.com/9657800/143159190-37662914-081f-4936-9df9-140eb22ba829.png)

![Screen Shot 2564-11-24 at 09 14 11](https://user-images.githubusercontent.com/9657800/143159198-96784fd3-fe3f-4008-b7b3-b415605456a3.png)

![Screen Shot 2564-11-24 at 09 14 25](https://user-images.githubusercontent.com/9657800/143159211-d65141da-b9a4-4988-860d-6da0fb964ecc.png)


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
