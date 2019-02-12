export interface IDisposable {
  /**
   * Return true if this domain been disposing
   */
  disposing: boolean;

  /**
   * Return true if this domain been disposed
   */
  disposed: boolean;

  /**
   * Dispose domain and release all agents
   */
  dispose(): void;
}
