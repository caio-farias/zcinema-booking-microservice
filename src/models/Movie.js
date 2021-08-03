const { Model, DataTypes } = require('sequelize')
const Session = require('./Session')
const { generateSeats } = require('../utils')

class Movie extends Model {
  static associate(models){
    this.hasMany(models.Session, { 
      foreignKey: 'movie_id', 
      as: 'sessions',
    })
  }
  static init(connection){
    super.init({
      title:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description:   {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      schedules:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    },{
      modelName: 'Movie',
      sequelize: connection,
      hooks: {
        afterUpdate: async (movie, options) => {
          if(movie.schedules.length == 0)
            return
            
          const movie_id = movie.id
          const movie_title  = movie.title
          const available_seats = generateSeats()
          const sold_seats = []
          const session_watchers_id = []
          const description = 'EM BREVE - Sala: EM BREVE'

          movie.schedules.map(async schedule => {
           await Session.findCreateFind({ 
              where: { schedule }, 
              defaults: { 
                movie_id, 
                movie_title,
                available_seats, 
                sold_seats, 
                session_watchers_id,
                description
              } 
            })
          })
        }
      }
    })
  }
}

module.exports = Movie