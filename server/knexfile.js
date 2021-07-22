module.exports = {
  development: {
    client: "pg",
    connection: { user: "postgres", database: "ts_store", password: "1234" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
