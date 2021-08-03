const { secret } = require('../micserviceSecret.json')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if(!authHeader)
    return res.status(401).send({ message: "Token de microsserviços não informado."})
  
  const isSameToken = secret == authHeader
  if(!isSameToken)
    return res.status(401).send({ message: "Token de microsserviços inválido."})
  
  next()
}