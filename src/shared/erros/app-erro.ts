export class AppError extends Error {
  public readonly statusCode: number;
  private readonly badFields?: string[];

  constructor(message: string, statusCode = 400, badFields?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.badFields = badFields;
  }
}
