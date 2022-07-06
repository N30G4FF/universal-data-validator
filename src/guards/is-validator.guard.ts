import { IValidator } from "../interfaces/validator.interface";

export function isValidator<T>(value: unknown): value is IValidator<T> {
  return typeof (value as IValidator<T>).go === "function";
}
