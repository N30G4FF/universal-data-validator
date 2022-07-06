import { IValidator } from "../interfaces/validator.interface";
import { Result } from "../types/result.type";

type NumberRule =
  | { type: "equal"; value: string }
  | { type: "notEqual"; value: string }
  | { type: "min"; min: number }
  | { type: "max"; max: number };

export class NumberValidator implements IValidator<string> {
  constructor(private rules?: NumberRule[]) {
    if (!Array.isArray(this.rules)) {
      this.rules = [];
    }
  }

  private addRule: (rule: NumberRule) => NumberRule[] = (rule) => {
    const filtered = this.rules.filter((r) => r.type !== rule.type);

    return [...filtered, rule];
  };

  equals: (value: string) => NumberValidator = (value) => {
    this.rules = this.addRule({ type: "equal", value: value });
    return this;
  };

  notEquals: (value: string) => NumberValidator = (value) => {
    this.rules = this.addRule({ type: "notEqual", value: value });
    return this;
  };

  minLength: (min: number) => NumberValidator = (min) => {
    this.rules = this.addRule({ type: "min", min: min });
    return this;
  };

  maxLength: (max: number) => NumberValidator = (max) => {
    this.rules = this.addRule({ type: "max", max: max });
    return this;
  };

  notEmpty: () => NumberValidator = () => {
    this.rules = this.addRule({ type: "min", min: 1 });
    return this;
  };

  empty: () => NumberValidator = () => {
    this.rules = this.addRule({ type: "max", max: 0 });
    return this;
  };

  checkRule: (rule: NumberValidator, value: string) => Result<string> = (
    rule,
    value
  ) => {
    throw new Error("Not yet implemented");
  };

  go: (value: unknown) => Result<string> = (value) => {
    throw new Error("Not yet implemented");
  };
}
