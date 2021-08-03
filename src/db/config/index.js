const { isDevEnviroment } = require('../../utils')
const devCofig = require('./dev')
const prodCofig = require('./prod')

module.exports = isDevEnviroment()? devCofig: prodCofig;