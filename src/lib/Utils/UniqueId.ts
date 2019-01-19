/**
 * Get unique id for an object for current process
 */
export function UniqueId(): string {
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 2;
  const stacks = Error().stack!.split('\n');
  Error.stackTraceLimit = stackTraceLimit;
  return stacks[stacks.length - 1].slice(7);
}
