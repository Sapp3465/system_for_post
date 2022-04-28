# bravo Database

## Start

If you want to create bravo database - you must enter this commands in your postgres terminal :

1. Enter to default postgres user

2. Create new user 'bravouser'

 ```sql
CREATE USER bravouser PASSWORD '1111';
ALTER ROLE bravouser createrole createdb;
 ```

3. Go over and select a new 'bravouser'

4. Navigate to the directory with this file

 ```sql
\cd your_path_to_this_file/src/db
 ```

5. Create this database with the command

 ```sql
\ir getStart.sql
 ```

6. You can now work with the database

## Datalogic model

![datalogic model](https://github.com/BohdanShmalko/bravo/blob/main/back/assets/model.png?raw=true)