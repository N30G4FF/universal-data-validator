import { PropertyValidator } from "../types/property-validator.type";

export type Shape<T extends object> = Record<keyof T, PropertyValidator<any>>;
