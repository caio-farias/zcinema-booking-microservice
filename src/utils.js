require('dotenv/config')
const moment = require('moment')

const generateSeats = (rows, columns) =>{
  const letters = ['A','B','C']
  const output = []
  letters.map((letter) => {
    for (let index = 1; index < 7; index++) {
      output.push(letter + index)
    }
  })
  return output
}

const generateSessions = (movie, schedules, start_date, end_date) => {
  const { id, title } = movie
  const available_seats = generateSeats()
  const reserved_seats = []
  const sold_seats = []
  const session_watchers_id = []
  const output = []
  const price = 19.90
  const description = 'A DEFINIR'
  const start = moment(start_date, 'YYYY-MM-DD')
  const end = moment(end_date, 'YYYY-MM-DD')
  const numberOfSessions = end.diff(start, 'days')
  
  for (let index = 0; index < numberOfSessions; index++) {
    const date = start.add(1, 'days').format('YYYY-MM-DD')
    schedules.map(schedule => {
      output.push({
        movie_id: id,
        movie_title: title, 
        description,
        schedule,
        date,
        price,
        available_seats,
        reserved_seats,
        sold_seats,
        session_watchers_id
      })
    }) 
  }
  return output
}

const isDevEnviroment = () =>  {
  return process.env.NODE_ENV === 'development'
}

module.exports = {
  generateSeats: generateSeats,
  isDevEnviroment: isDevEnviroment,
  generateSessions: generateSessions,
}