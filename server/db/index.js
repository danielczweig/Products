const { Pool } = require('pg')

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}

const pool = new Pool (credentials)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

;(async function() {
  const client = await pool.connect()
  await client.query(
    `CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price VARCHAR,
      features JSON,
      related JSON,
      styles JSON
    );`, (err, res) => {
      if (err) console.log('this is the client.query err:', err)
    }
  )

  client.release()
})()
