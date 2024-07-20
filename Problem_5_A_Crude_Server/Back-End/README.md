# UserApp Back-end Repository

This is the back-end component of the application, built with Node.js, Express, and PostgreSQL. It provides API endpoints for managing users, including CRUD operations and file uploads.

## Tech Stack

**Back-end:** NodeJS, Express, Sequelize ORM, PostgreSQL

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

`DB_USERNAME=your database userName`

`DB_PASSWORD=your database password`

`DB_NAME=your database Name`

`DB_HOST=your database IP, ex: localhost:5678 `

`BACKEND_URL=your backend URL, ex: localhost:8080`

`STORAGE_URL=assets/images`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Thai8424/Nguyen_Thanh_Thai.git
```

Go to the project directory

```bash
  cd .\Problem_5_A_Crude_Server\Back-End\
```

Install dependencies

```bash
  npm install
```

Run migrate for creating database

```bash
  npm run migrate:reset 
```

Run seeder for creating database

```bash
  npm run seed:reset  
```

Start the server

```bash
  npm run dev