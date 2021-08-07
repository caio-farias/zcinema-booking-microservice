const Session = require('../models/Session')
const Movie = require('../models/Movie')
const Booking = require('../models/Booking')
const { generateSeats } = require('../utils')
const { Op } = require('sequelize')

module.exports = {
  async createSession(req, res) {
    const { movie_id } = req.params
    const {
      description, 
      schedule,
    } = req.body

    const available_seats = generateSeats()
    const sold_seats = []
    const session_watchers_id = []

    try {
      const movie = await Movie.findByPk(movie_id)

      if(!movie){
        return res.status(409).json({ message: "Filme não existe."})
      }

      const  movie_title = movie.title
      const session = await Session.create({
        movie_id, 
        movie_title,
        description, 
        schedule,
        session_watchers_id,
        available_seats,
        sold_seats,
      })

      return res.status(201).json(session)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getAllSessionsByDate(req, res){
    const { movie_title, date, schedule } = req.query
    try {

      const { rows, count } = await Session.findAndCountAll({ 
        where: {
          date: {
            [Op.eq]: date
          },
          movie_title: {
            [Op.startsWith]: movie_title
          },
          schedule: {
            [Op.startsWith]: schedule
          }
        },
        limit: 30, 
        offset: 0
      })

      if(count == 0)
        return res.status(409).json({ message: "Sessão selecionada inexistente" })

      const sessions = rows
      return res.json({ sessions })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getAllUserSessions(req, res){
    const { user_id } = req.params

    try {
      const bookings = await Booking.findAll({
          where: { user_id },
          include: { association: 'session-booked' }
        })

      if(!bookings)
        return res.status(409).json({ message: "Usuário não possui reservas." })
        
      return res.json({ bookings })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getAllSessions(req, res){
    try {
      const sessions = await Session.findAll({})
      
      return res.json({ sessions })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async updateSession(req, res){
    const { movie_id } = req.params
    const { date, schedule } = req.query
    const {
      session_watchers,
      available_seats,
      sold_seats,
    } = req.body

    try {
      const session = await Session.findOne({ where: { movie_id, date, schedule } })
      if(!session){
        return res.status(409).json({ message: "Sessão não existe." })
      }
      session.update({
        session_watchers,
        available_seats,
        sold_seats,

      }, { where: { id } })

      return res.json(session)
    } catch (error) {
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async deleteSession(req, res){
    const { movie_id } = req.params
    const { date, schedule } = req.query
    try {
      const session = await Session.findOne({ where: { movie_id, date, schedule } })
      if(!session){
        return res.status(409).json({ message: "Sessão não existe." })
      }
      await session.destroy({ where: { movie_id, schedule } })
      return res.json({ message: "Sessão deletada com sucesso!"})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  }
}