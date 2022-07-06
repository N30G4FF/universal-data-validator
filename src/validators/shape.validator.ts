import { IValidator } from "../interfaces/validator.interface";
import { Result } from "../types/result.type";
import { Shape } from "../types/shape.type";
import { isValidator } from "../guards/is-validator.guard";

export class ShapeValidator<T extends object> implements IValidator<T> {
  constructor(private shape: Shape<T>) {}

  go: (value: unknown) => Result<T> = (value) => {
    const err: (msg: string) => Result<T> = (msg) => ({
      ok: false,
      message: msg,
    });

    if (value === null || value === undefined) {
      return err("Value cannot be null or undefined.");
    } else if (Array.isArray(value)) {
      return err("Value must be an object but was an array.");
    } else if (typeof value !== "object") {
      return err(`Value must be an object but was ${typeof value}.`);
    }

    const expectedKeys = Object.getOwnPropertyNames(this.shape);
    const actualKeys = Object.getOwnPropertyNames(value);

    for (let expected of expectedKeys) {
      if (actualKeys.indexOf(expected) === -1) {
        return err(`Value is missing expected property ${expected}.`);
      }
    }

    for (let expected of expectedKeys) {
      const validator = this.shape[expected];
      const propValue = value[expected];

      const result = isValidator(validator)
        ? validator.go(propValue)
        : validator(propValue);

      if (result.ok === false) return result;
    }

    return {
      ok: true,
      value: value,
    };
  };
}
