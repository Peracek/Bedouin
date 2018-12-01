export class AppError extends Error {
  innerError?: Error

  constructor(message: string, innerError?: Error) {
    super(message)
    this.innerError = innerError
  }
}

