const  Booking = require('../models/Booking')
const Session = require('../models/Session')
const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = {
  async createBooking(req, res) {
    const { user_id, session_id } = req.params
    const { seat, type } = req.body

    try {
      const session = await Session.findByPk(session_id)
      if(!session)
        return res.status(409).json({ message: "Sessão não existe."})
      
      const isSeatAvailable = session.checkSeatAvailability(seat)
      if(!isSeatAvailable)
        return res.status(409).json({ message: "Assento indisponível."})

      const user = await User.findByPk(user_id)
      if(!user)
        return res.status(409).json({ message: "Usuário não já existe."})
      

      const { price, date } = session
      const booking = await Booking.create({ 
        user_id,
        session_id,
        price,
        type,
        seat,
        session_date: date
      })
      session.reserve(seat)
      return res.status(201).json(booking)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getAllBookingsByDate(req, res){
    try {
      const { date } = req.query
      const { protocol, path } = req
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      if(!date){
        var bookings = await Booking.findAll({ limit: limit + 1, offset: page })
      } else {
        console.log(date)
        const { rows } = await Booking.findAndCountAll(
          {
            where:{
              session_date: {
                [Op.eq]: date
              },
            },
            limit: limit + 1,
            offset: page
          })
        var bookings = rows
      }

      const next = `${protocol}://${req.get('host')}${path}?` +
        `session_date=${date}&limit=${limit}&page=${page + limit}`
      
      const previous = `${protocol}://${req.get('host')}${path}?` +
        `session_date=${date}&limit=${limit}&page=${page - limit > 0 ? page - limit : 0}`
        
      return res.status(200).json({ 
        count: bookings.length, 
        previous: bookings.length > 1 ? previous : '', 
        next: bookings.length > 1 ? next: '',
        bookings
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getBooking(req, res){
    const { session_id, user_id } = req.params

    const user = await User.findByPk(user_id)
    if(!user)
      return res.status(409).json({ message: "Usuário não já existe."})

    const session = await Session.findByPk(session_id)
    if(!session)
        return res.status(409).json({ message: "Sessão não existe."})
      

    try {
      const booking = await Booking.findOne({ 
        where: { 
          user_id: user_id, 
          session_id: session_id 
        } 
      })
      if(!booking)
        return res.status(409).json({ message: "Filme inexistente" })
        
      return res.json(booking)
    } catch (error) {
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async updateBooking(req, res){
    const { user_id, session_id, } = req.params
    const { status } = req.body
    
    const statusPossibilities = ['FAILED','PENDING', 'COMPLETED', 'CANCELED']
    if(!statusPossibilities.includes(status))
      return res.status(400).json({ message: "Status inválido"})
    
      try {
      const user = await User.findByPk(user_id)
      if(!user)
        return res.status(409).json({ message: "Usuário não já existe."})
  
      const session = await Session.findByPk(session_id)
      if(!session)
        return res.status(409).json({ message: "Sessão não existe."})

      const booking = await Booking.findOne({ 
        where: { 
          user_id: user_id, 
          session_id: session_id 
        }
      })
      if(!booking){
        return res.status(409).json({ message: "Filme não existe." })
      }
      booking.update({
        status: status,
      }, { where: { user_id: user_id, session_id: session_id } })

      return res.json(booking)
    } catch (error) {
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async deleteBooking(req, res){
    const { user_id, session_id } = req.params
    try {
      const session = await Session.findByPk(session_id)
      if(!session)
        return res.status(409).json({ message: "Sessão não existe."})

      const user = await User.findByPk(user_id)
        if(!user)
          return res.status(409).json({ message: "Usuário não já existe."})

      const booking = await Booking.findOne({ 
        where: { 
          user_id: user_id, 
          session_id: session_id 
        } 
      })
      if(!booking){
        return res.status(409).json({ message: "Reserva não existe." })
      }
      await booking.destroy()
      return res.json({ message: "Reserva deletada com sucesso!"})
    } catch (error) {
      return res.status(500).json({ message: "Ocorreu um erro, tente novamente." })
    }
  }
}