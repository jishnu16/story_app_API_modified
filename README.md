# Story App API

## SETUP LOCAL MYSQL DATABASE WITH a DB_NAME(This will need to put in db-config)

## Steps to set up:-

1. install knex globally with `npm install knex -g` on terminal/powershell.
2. Clone this repo and do inside it and run `npm install`
3. In `config/db-Secrets.js`, change the development settings to your specific settings.(host,username password, DB_NAME(Previously created), port etc).
4. Run on terminal/powershell `knex migrate:latest`, this will apply all available migrations and creates the db structure.

## Running the application
In terminal/Powershell, do
```
npm start
```

You will see a log
```
Server running on localhost:3000
Swagger Doc => http://localhost:3000/api-docs
```
you can now go to `http://localhost:3000/api-docs` and see the API Docs and usages.
