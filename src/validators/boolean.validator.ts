import { IValidator } from "../interfaces/validator.interface";
import { Result } from "../types/result.type";

type BooleanRule =
  | { type: "equal"; value: string }
  | { type: "notEqual"; value: string }
  | { type: "min"; min: number };

export class BooleanValidator implements IValidator<string> {
  constructor(private rules?: BooleanRule[]) {
    if (!Array.isArray(this.rules)) {
      this.rules = [];
    }
  }

  private addRule: (rule: BooleanRule) => BooleanRule[] = (rule) => {
    const filtered = this.rules.filter((r) => r.type !== rule.type);

    return [...filtered, rule];
  };

  equals: (value: string) => BooleanValidator = (value) => {
    this.rules = this.addRule({ type: "equal", value: value });
    return this;
  };

  notEquals: (value: string) => BooleanValidator = (value) => {
    this.rules = this.addRule({ type: "notEqual", value: value });
    return this;
  };

  notEmpty: () => BooleanValidator = () => {
    this.rules = this.addRule({ type: "min", min: 1 });
    return this;
  };

  checkRule: (rule: BooleanValidator, value: string) => Result<string> = (
    rule,
    value
  ) => {
    throw new Error("Not yet implemented");
  };

  go: (value: unknown) => Result<string> = (value) => {
    throw new Error("Not yet implemented");
  };
}
