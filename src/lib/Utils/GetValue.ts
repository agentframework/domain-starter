// import { caller } from './Stack';

export function GetValue<T>(that: any, name:string, value: T): T {
  // const name = caller().getMethodName();
  Reflect.defineProperty(that, name, { value });
  return value;
}
