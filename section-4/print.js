const chalk = require('chalk')

const s = (txt) => {
  console.log(chalk.green.inverse(txt))
}

const w = (txt) => {
  console.log(chalk.yellow.inverse(txt))
}

const e = (txt) => {
  console.log(chalk.red.inverse(txt))
}

module.exports = {
  s,
  w,
  e
}