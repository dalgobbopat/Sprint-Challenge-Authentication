module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  
    // db connection for testing
    testing: {
      client: "sqlite3",
      connection: {
        filename: "./data/test.db3",
      },
      useNullAsDefault: true,
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        direcotry: "./data/seeds",
      },
    },
  
    // Heroku will look for a 'production' configuration
    production: {
      client: 'pg', 
      connection: process.env.DATABASE_URL, // provided by Heroku
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },
};	
  

