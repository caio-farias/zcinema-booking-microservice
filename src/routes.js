const express = require('express')
const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')
const SessionController = require('./controllers/SessionController')
const BookingController = require('./controllers/BookingController')
const MicserviceAuthMiddleware = require('./middlewares/MicserviceAuth')
const CheckQueryMiddleware = require('./middlewares/CheckQuery')
const CheckFilterQueryMiddleware = require('./middlewares/CheckFilterQuery')
const routes = express.Router()

routes.post('/bookings/users', UserController.createUser)
routes.get('/bookings/users', UserController.getAllUsers)
routes.get('/bookings/users/:id', UserController.getUser)
routes.patch('/bookings/users/:id', UserController.updateUser)
routes.delete('/bookings/users/:id', UserController.deleteUser)


routes.post('/bookings/movies', MicserviceAuthMiddleware, MovieController.createMovie)
routes.get('/bookings/movies/:id', MicserviceAuthMiddleware, MovieController.getMovie)
routes.patch('/bookings/movies/:id', MicserviceAuthMiddleware, MovieController.updateMovie)
routes.delete('/bookings/movies/:id', MicserviceAuthMiddleware, MovieController.deleteMovie)

routes.get(
  '/bookings/sessions', 
  MicserviceAuthMiddleware, 
  SessionController.getAllSessions
)
routes.get(
  '/bookings/sessions/:user_id', 
  MicserviceAuthMiddleware, 
  SessionController.getAllUserSessions
)
routes.patch(
  '/bookings/movies/:movie_id/sessions', 
  [MicserviceAuthMiddleware, CheckQueryMiddleware], 
  SessionController.updateSession
)
routes.delete(
  '/bookings/movies/:movie_id/sessions', 
  [MicserviceAuthMiddleware, CheckQueryMiddleware], 
  SessionController.deleteSession
)


routes.post(
  '/bookings/:user_id/:session_id',
  MicserviceAuthMiddleware, 
  BookingController.createBooking
)
routes.get(
  '/bookings',
  [MicserviceAuthMiddleware, CheckFilterQueryMiddleware], 
  BookingController.getAllBookingsByDate
)
routes.get(
  '/bookings/:user_id/:session_id',
  MicserviceAuthMiddleware, 
  BookingController.getBooking
)
routes.patch(
  '/bookings/:user_id/:session_id',
  MicserviceAuthMiddleware, 
  BookingController.updateBooking
)
routes.delete(
  '/bookings/:user_id/:session_id',
  MicserviceAuthMiddleware, 
  BookingController.deleteBooking
)


module.exports = routes