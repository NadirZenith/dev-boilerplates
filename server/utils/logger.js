import util from 'util'
import fs from 'fs' //log

const contexts = []
const logger = (context) => {
  const _context = context ? context : 'default'

  if (!contexts[_context]) {
    contexts[_context] = fs.createWriteStream('./logs/' + _context + '.log', {
      flags: 'a'
    })
  }
  let _logger = {};
  _logger.log = function() {
    contexts[_context].write(util.format.apply(null, arguments) + '\n')
  }
  return _logger;
}

export default logger
