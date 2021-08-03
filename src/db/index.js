const Sequelize = require('sequelize')
const dbConfig = require('./config')
const Movie = require('../models/Movie')
const Booking = require('../models/Booking')
const User = require('../models/User')
const Session = require('../models/Session')

const connection = new Sequelize(dbConfig)

User.init(connection)
Movie.init(connection)
Session.init(connection)
Booking.init(connection)

User.associate(connection.models)
Movie.associate(connection.models)
Session.associate(connection.models)
Booking.associate(connection.models)

module.exports = connection