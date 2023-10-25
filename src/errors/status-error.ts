import { ErrorArgs, ErrorState } from "../store/error-slice";

export default class CustomError extends Error {
  public code?: string;
  public status?: number;

  constructor(args: ErrorArgs) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
  }
}