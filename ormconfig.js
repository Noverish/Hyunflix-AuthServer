module.exports = {
   "type": "mysql",
   "host": process.env.DATABASE_HOST || "localhost",
   "port": 3306,
   "username": process.env.DATABASE_USER,
   "password": process.env.DATABASE_PASSWORD,
   "database": process.env.DATABASE_DATABASE,
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
