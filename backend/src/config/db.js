const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:5432@localhost:5432/doky_pets_db"
});

module.exports = pool;