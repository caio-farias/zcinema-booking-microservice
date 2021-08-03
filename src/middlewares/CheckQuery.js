module.exports = async (req, res, next) => {
  const { date, schedule} = req.query

  if(!date)
    res.status(400).json({ message: "Informe a query date antes realizar requisição." })

  if(!schedule)
    res.status(400).json({ message: "Informe a query schedule antes realizar requisição." })

  next()
}