# Project start instructions

## Frontend (Angular)

1. Download [nodeJS + npm](https://nodejs.org/uk/download/) if not already installed

2. Download Angular CLI global `npm install -g @angular/cli`

3. Go to the desired directory `cd ./front`

4. Install all dependency `npm i`

5. Start project `npm start`

## Backend (express)

1. Download [nodeJS + npm](https://nodejs.org/uk/download/) if not already installed

2. Go to the desired directory `cd ./back`

3. Install all dependency `npm i`

4. Create `.env` file with your hotmail login and password 
   (EXAMPLE: `
   EMAIL = 'yourEmail@gmail.com'
   PASSWORD = 'yourPassword'`)
   
5. Start project `npm start`

## Database (Postgresql)

1. Download [postgresql](https://www.postgresql.org/download/) if not already installed

2. Enter to default postgres user in postgresql terminal

3. Create new user 'bravouser'  in postgresql terminal

 ```sql
CREATE USER bravouser PASSWORD '1111';
ALTER ROLE bravouser createrole createdb;
 ```

4. Go over and select a new 'bravouser'  in postgresql terminal

5. Navigate to the directory with this file  in postgresql terminal

 ```sql
\cd your_path_to_this_file/src/db
 ```

6. Create this database with the command  in postgresql terminal

 ```sql
\ir getStart.sql
 ```
