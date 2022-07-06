import { IValidator } from "../interfaces/validator.interface";
import { Result } from "../types/result.type";

type StringRule =
  | { type: "equal"; value: string }
  | { type: "notEqual"; value: string }
  | { type: "minLength"; min: number }
  | { type: "maxLength"; max: number }
  | { type: "isEmail" };

export class StringValidator implements IValidator<string> {
  constructor(private rules?: StringRule[]) {
    if (!Array.isArray(this.rules)) {
      this.rules = [];
    }
  }

  private addRule: (rule: StringRule) => StringRule[] = (rule) => {
    const filtered = this.rules.filter((r) => r.type !== rule.type);

    return [...filtered, rule];
  };

  equals: (value: string) => StringValidator = (value) => {
    this.rules = this.addRule({ type: "equal", value: value });
    return this;
  };

  notEquals: (value: string) => StringValidator = (value) => {
    this.rules = this.addRule({ type: "notEqual", value: value });
    return this;
  };

  minLength: (min: number) => StringValidator = (min) => {
    this.rules = this.addRule({ type: "minLength", min: min });
    return this;
  };

  maxLength: (max: number) => StringValidator = (max) => {
    this.rules = this.addRule({ type: "maxLength", max: max });
    return this;
  };

  notEmpty: () => StringValidator = () => {
    this.rules = this.addRule({ type: "minLength", min: 1 });
    return this;
  };

  empty: () => StringValidator = () => {
    this.rules = this.addRule({ type: "maxLength", max: 0 });
    return this;
  };

  isEmail: () => StringValidator = () => {
    this.rules = this.addRule({ type: "isEmail" });
    return this;
  };

  checkRule: (rule: StringRule, value: string) => Result<string> = (
    rule,
    value
  ) => {
    const err = (msg) => ({ ok: false, message: msg });
    const ok = () => ({ ok: true, value: value });

    switch (rule.type) {
      case "equal":
        return rule.value !== value
          ? err(`Value was expected to be ${rule.value} but was ${value}.`)
          : ok();

      case "notEqual":
        return rule.value === value
          ? err(`Value must not be ${rule.value}.`)
          : ok();

      case "minLength":
        return value.length < rule.min
          ? err(
              `String length must be greater than or equal to ${rule.min} but was ${value.length}.`
            )
          : ok();

      case "maxLength":
        return value.length > rule.max
          ? err(
              `String length must be less than or equal to ${rule.max} but was ${value.length}.`
            )
          : ok();

      case "isEmail":
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? ok()
          : err(`Value was expected to be an email but was ${value}`);
    }
  };

  go: (value: unknown) => Result<string> = (value) => {
    if (value === null) {
      return {
        ok: false,
        message: "StringValidator expected a string but received null.",
      };
    } else if (value === undefined) {
      return {
        ok: false,
        message: "StringValidator expected a string but received undefined.",
      };
    } else if (typeof value !== "string") {
      return {
        ok: false,
        message: `StringValidator expected a string but received ${typeof value}.`,
      };
    }

    for (let rule of this.rules) {
      const result = this.checkRule(rule, value);

      if (result.ok === false) {
        return result;
      }
    }

    return {
      ok: true,
      value: value,
    };
  };
}
