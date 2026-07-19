const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:12345@localhost:5433/doky_pets_db"
});

module.exports = pool;