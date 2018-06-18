# Employee Database

## Description

This is an Restful API for Node.js and Mysql. Boilerplate code was used from https://medium.com/@brianalois/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9

##### Routing         : Express
##### ORM Database    : Sequelize
##### Authentication  : Passport, JWT

## Installation

#### Install Node Modules
```
npm install
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application

## Running Server

```
$ npm start
```

This will start the server on port 3000 (default) and run data migrations to create your tables


```
> node ./bin/www

Environment: dev
Server listening on port: 3000
Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS `Employees` (`id` INTEGER NOT NULL auto_increment , `firstName` VARCHAR(255), `lastName` VARCHAR(255), `email` VARCHAR(255) UNIQUE, `phone` VARCHAR(255), `password` VARCHAR(255), `admin` TINYINT(1), `startDate` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Connected to SQL database: newdb
Executing (default): SHOW INDEX FROM `Employees`
Executing (default): CREATE TABLE IF NOT EXISTS `EmployeeReviews` (`id` INTEGER NOT NULL auto_increment , `employeeId` INTEGER, `reviewerId` INTEGER, `review` TEXT, `status` ENUM('ASSIGNED', 'PENDING', 'APPROVED') DEFAULT 'PENDING', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`employeeId`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`reviewerId`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `EmployeeReviews`

```

## Testing

### Postman Collection Can Be Found Here

Import the following link into [Postman](https://www.getpostman.com/)

https://www.getpostman.com/collections/d035d3b0ceb3a32ff103

### Admin User

Create your initial admin user using

`POST - http://localhost:3000/v1/employees`

#### Note

For testing purpose: The create employee API does not need a JWT token

#### Export

Alternatively, you may use the db export `paytm_2018-06-18.sql` provided in the migrations folder 

Admin login is: `admin@example.com`/`admin`