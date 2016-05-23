module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/emotions'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};

