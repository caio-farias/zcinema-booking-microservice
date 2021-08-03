module.exports = async (req, res, next) => {
  const { limit, page} = req.query

  if(!limit)
    res.status(400).json({ message: "Informe a query limit antes realizar requisição." })

  if(!page)
    res.status(400).json({ message: "Informe a query page antes realizar requisição." })

  next()
}