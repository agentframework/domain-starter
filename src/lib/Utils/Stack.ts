// export interface ICallSite {
//   /**
//    * Value of "this"
//    */
//   getThis(): any;
//
//   /**
//    * Type of "this" as a string.
//    * This is the name of the function stored in the constructor field of
//    * "this", if available.  Otherwise the object's [[Class]] internal
//    * property.
//    */
//   getTypeName(): string | null;
//
//   /**
//    * Current function
//    */
//   getFunction(): Function | undefined;
//
//   /**
//    * Name of the current function, typically its name property.
//    * If a name property is not available an attempt will be made to try
//    * to infer a name from the function's context.
//    */
//   getFunctionName(): string | null;
//
//   /**
//    * Name of the property [of "this" or one of its prototypes] that holds
//    * the current function
//    */
//   getMethodName(): string | null;
//
//   /**
//    * Name of the script [if this function was defined in a script]
//    */
//   getFileName(): string | null;
//
//   /**
//    * Current line number [if this function was defined in a script]
//    */
//   getLineNumber(): number | null;
//
//   /**
//    * Current column number [if this function was defined in a script]
//    */
//   getColumnNumber(): number | null;
//
//   /**
//    * A call site object representing the location where eval was called
//    * [if this function was created using a call to eval]
//    */
//   getEvalOrigin(): string | undefined;
//
//   /**
//    * Is this a toplevel invocation, that is, is "this" the global object?
//    */
//   isToplevel(): boolean;
//
//   /**
//    * Does this call take place in code defined by a call to eval?
//    */
//   isEval(): boolean;
//
//   /**
//    * Is this call in native V8 code?
//    */
//   isNative(): boolean;
//
//   /**
//    * Is this a constructor call?
//    */
//   isConstructor(): boolean;
// }
//
// export abstract class CallSite implements ICallSite {
//   /**
//    * returns the value of this
//    */
//   abstract getThis(): any;
//
//   /**
//    * returns the type of this as a string. This is the name of the function stored in the constructor field of this, if available, otherwise the object's [[Class]] internal property.
//    */
//   abstract getTypeName(): any;
//
//   /**
//    * returns the current function
//    */
//   abstract getFunction(): any;
//
//   /**
//    * returns the name of the current function, typically its name property. If a name property is not available an attempt will be made to try to infer a name from the function's context.
//    */
//   abstract getFunctionName(): any;
//
//   /**
//    * returns the name of the property of this or one of its prototypes that holds the current function
//    */
//   abstract getMethodName(): any;
//   /**
//    * if this function was defined in a script returns the name of the script
//    */
//   abstract getFileName(): any;
//
//   /**
//    * if this function was defined in a script returns the current line number
//    */
//   abstract getLineNumber(): any;
//
//   /**
//    * if this function was defined in a script returns the current column number
//    */
//   abstract getColumnNumber(): any;
//
//   /**
//    *if this function was created using a call to eval returns a CallSite object representing the location where eval was called
//    */
//   abstract getEvalOrigin(): any;
//
//   /**
//    *is this a toplevel invocation, that is, is this the global object?
//    */
//   abstract isToplevel(): any;
//
//   /**
//    *does this call take place in code defined by a call to eval?
//    */
//   abstract isEval(): any;
//
//   /**
//    *is this call in native V8 code?
//    */
//   abstract isNative(): any;
//
//   /**
//    *is this a constructor call?
//    */
//   abstract isConstructor(): any;
// }
//
// export function caller(): CallSite {
//   const _prepareStackTrace = Error.prepareStackTrace;
//   const a = Error.stackTraceLimit;
//   Error.stackTraceLimit = 2;
//   Error.prepareStackTrace = (_, stack) => stack;
//   const err: any = {};
//   Error.captureStackTrace(err, caller);
//   const stack = err.stack[1];
//   Error.prepareStackTrace = _prepareStackTrace;
//   Error.stackTraceLimit = a;
//   return stack;
// }
//
// export function stack(): Array<CallSite> {
//   const _prepareStackTrace = Error.prepareStackTrace;
//   const a = Error.stackTraceLimit;
//   Error.stackTraceLimit = Infinity;
//   Error.prepareStackTrace = (_, s) => s;
//   const err: any = {};
//   Error.captureStackTrace(err, stack);
//   const s = err.stack.slice(1);
//   Error.prepareStackTrace = _prepareStackTrace;
//   Error.stackTraceLimit = a;
//   return s;
// }
