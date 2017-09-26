module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'divvi'
    }
  },
  test: {
    secret: 'divvitest',
    client: 'pg',
    connection: 'postgres://localhost/divvi_test'
  },
  production: {
    secret: 'divvitest',
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
