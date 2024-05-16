# Day 1 - MySQL Setup and Model Definition

## Problem 1: Setting up MySQL on Local Machine

To set up MySQL on your local machine, you need to have MySQL and MySQL Workbench installed. Follow these steps:

1. Download and install MySQL from the official website: [MySQL Downloads](https://dev.mysql.com/downloads/).
2. Download and install MySQL Workbench from the official website: [MySQL Workbench Downloads](https://dev.mysql.com/downloads/workbench/).
3. Launch MySQL Workbench and connect to your local MySQL server.
   You can also follow any Youtube Videos.

## Problem 2: Writing Models in MySQL

In MySQL, you can define types.

```mysql
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  return Users;
};

```

## Problem 3: [Biggest Problem] PORT Configuration Problem

MySQL by default takes port 3306 to run its services. If any other service is already running on port 3306 and you configure mysql to run on some other port, then you need to make some configurations.

In index.js file i.e is present within models folder make below changes.

```mysql
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    port: process.env.DB_PORT,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    port: process.env.DB_PORT,
  });
}
```

In config.json file make below changes.

```
"development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "port": 3308       <------------- IMPORTANT
  },
```
