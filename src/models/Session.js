const { Model, DataTypes } = require('sequelize')

class Session extends Model {
  static associate(models){
    this.belongsTo(models.Movie, { 
      foreignKey: 'movie_id', 
      as: 'movie', 
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    this.hasMany(models.Booking, { 
      foreignKey: 'session_id', 
      as: 'session-booking' 
    })
  }
  checkSeatAvailability(seat){
    return this.available_seats.includes(seat)
  }
  async reserve(seat){
    const index = this.available_seats.indexOf(seat)
    if(index <= -1)
    return false
    
    this.available_seats.splice(index, 1)
    this.reserved_seats.push(seat)
    
    await Session.update({
      available_seats: this.available_seats,
      reserved_seats: this.reserved_seats
    },{ where: { id: this.id } })
    return true
  }
  async confirmSale(user_id, user_seat){
    this.session_watchers_id.push(user_id)
    this.sold_seats.push(user_seat)
    await Session.update({
      session_watchers_id: this.session_watchers_id,
      sold_seats: this.sold_seats
    },{ where: { id: this.id } })
  }
  static init(connection){
    super.init({
      movie_title:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      schedule: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      session_watchers_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      available_seats: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      reserved_seats: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      sold_seats: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
    },{
      modelName: 'Session',
      sequelize: connection,
    })
  }
}

module.exports = Session