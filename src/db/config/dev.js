module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'cinema-db-bookings',
  define : {
    timestamps: true,
    underscored: true,
  },
}