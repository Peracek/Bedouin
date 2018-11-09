import winston from 'winston'

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    // winston.format.colorize({ all: true }),
    winston.format.simple(),
  )
})

export const log = logger.log.bind(logger)
export default logger