const chalk = require('chalk')

s = (txt) => {
  console.log(chalk.green.inverse(txt))
}

w = (txt) => {
  console.log(chalk.yellow.inverse(txt))
}

e = (txt) => {
  console.log(chalk.red.inverse(txt))
}

module.exports = {
  s,
  w,
  e
}