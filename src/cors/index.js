const cors = require('cors')

const corsOpt = {
  origin: '*',
  optionsSuccessStatus: 200
}

module.exports = cors(corsOpt)