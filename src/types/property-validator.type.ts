import { IValidator } from "../interfaces/validator.interface";
import { Result } from "./result.type";

export type PropertyValidator<T> =
  | IValidator<T>
  | ((value: unknown) => Result<T>);
