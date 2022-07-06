import { Result } from "../types/result.type";

export interface IValidator<T> {
  go(value: unknown): Result<T>;
}
