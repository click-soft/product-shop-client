export default class UnhandledError extends Error {
  constructor(error: any) {
    super(error?.message);
    this.name = 'Unhandled Error';
  }
}
