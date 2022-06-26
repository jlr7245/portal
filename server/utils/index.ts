export interface StatusError extends Error {
  status: number;
  error?: Error;
}

export class StatusError extends Error {
  status: number;
  error?: Error;

  constructor(status: number, message: string, error?: Error) {
    super(message);
    this.status = status;
    this.error = error;
  }
}