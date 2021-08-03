
const User = require("../models/User")

module.exports = {
  async createUser(req, res) {
    const { first_name, last_name, email, profile } = req.body

    try {
      const isSameUser = await User.findOne({ where: { email : email } })
      if(isSameUser){
        return res.status(400).json({ message: "Usuário já existe."})
      }
      const user = await User.create({ 
        first_name, 
        last_name,
        email,
        profile,
      })
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getAllUsers(req, res){
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async getUser(req, res){
    const { id } = req.params
    try {
      const user = await User.findOne({ where: { id: id } })
      if(!user)
        return res.status(400).json({ message: "Usuário inexistente" })
        
      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async updateUser(req, res){
    const { id } = req.params
    const { first_name, last_name, email, profile } = req.body
    console.log(req.body)
    try {
      const user = await User.findOne({ where: { id: id }})
      if(!user){
        return res.status(400).json({ message: "Usuário não existe." })
      }
      user.update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        profile: profile,
      }, { where: { id: id } })
      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro, tente novamente." })
    }
  },
  async deleteUser(req, res){
    const { id } = req.params
    try {
      const user = await User.findOne({ where: { id: id } })
      if(!user){
        return res.status(400).json({ message: "Usuário não existe." })
      }
      await user.destroy()
      return res.json({ message: "Usuário deletado com sucesso!"})
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro, tente novamente." })
    }
  }
}