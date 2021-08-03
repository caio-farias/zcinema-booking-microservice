const { Model, DataTypes } = require('sequelize')

class Booking extends Model {
  static associate(models){
    this.belongsTo(models.Session, { 
      foreignKey: 'session_id', 
      as: 'session-booked',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    this.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user-booking',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  }
  static init(connection){
    super.init({
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      session_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('Meia-Entrada', 'Inteira'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'PENDING',
        values: ['PENDING', 'FAILED', 'COMPLETED', 'CANCELED']
      },
      seat:{
        type:DataTypes.STRING,
        allowNull: false,
      },
    },{
      modelName: 'Booking',
      sequelize: connection,
    })
  }
}

module.exports = Booking