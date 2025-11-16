/**
 * @module log
 * @description
 * Lightweight logging utility for SCE (Semantic Control Encoding).
 *
 * This module provides a simple, standardized logging interface that wraps
 * the native `console` object. It enables consistent logging patterns across
 * the SCE codebase while maintaining flexibility for future enhancements
 * (e.g., custom transports, log levels, or structured logging).
 *
 * **Key Features:**
 * - Type-safe logging interface via {@link SceLog}
 * - Callback-based logger access for imperative logging
 * - Direct logger retrieval for functional composition
 * - Zero dependencies beyond Node.js/browser console
 *
 * **Design Philosophy:**
 * The logger is intentionally minimal, delegating to the platform's native
 * console rather than introducing logging framework overhead. This keeps
 * the SCE core lightweight while providing a stable abstraction point for
 * future logging enhancements.
 *
 * @example
 * ```typescript
 * // Direct retrieval
 * const logger = log();
 * logger.log("Processing symbols...");
 * logger.warn("Deprecated emoji detected");
 *
 * // Callback-based (imperative style)
 * log((l) => {
 *   l.log("Starting validation");
 *   l.error("Critical error encountered");
 * });
 * ```
 */

/**
 * Standardized logging interface for SCE operations.
 *
 * Provides type-safe access to common logging methods. All methods accept
 * variadic arguments matching the native `console` API, enabling structured
 * logging and object inspection without custom formatters.
 *
 * **Methods:**
 * - `log` — General informational output
 * - `warn` — Warning-level messages (e.g., deprecations, non-critical issues)
 * - `error` — Error-level messages (e.g., validation failures, exceptions)
 * - `debug` — Debug-level verbose output for development
 *
 * **Implementation Note:**
 * Currently delegates to the global `console` object. Future versions may
 * introduce configurable log levels, custom transports, or structured logging.
 *
 * @example
 * ```typescript
 * const logger: SceLog = log();
 *
 * logger.log("Symbol extraction complete:", { count: 5 });
 * logger.warn("Emoji conflict detected:", "📝", "vs", "🖊️");
 * logger.error("Validation failed:", new Error("Missing emoji"));
 * logger.debug("Raw ontology data:", ontology);
 * ```
 */
export type SceLog = {
  /**
   * General informational logging.
   *
   * @param args - Values to log (primitives, objects, errors, etc.)
   */
  log: (...args: any[]) => void;

  /**
   * Warning-level logging for non-critical issues.
   *
   * @param args - Warning messages and context data
   */
  warn: (...args: any[]) => void;

  /**
   * Error-level logging for critical failures.
   *
   * @param args - Error messages, exceptions, and diagnostic context
   */
  error: (...args: any[]) => void;

  /**
   * Debug-level verbose logging for development.
   *
   * @param args - Debug data, internal state, and diagnostic information
   */
  debug: (...args: any[]) => void;
};

/**
 * Function overload signatures for the {@link log} utility.
 *
 * Enables both callback-based imperative logging and direct logger retrieval:
 * - **Callback form**: `log((l) => { ... })` — Execute logging statements within callback
 * - **Direct form**: `log()` — Retrieve logger instance for assignment or composition
 *
 * @internal
 */
interface LogOverloads {
  /**
   * Execute logging statements within a callback function.
   *
   * @param cb - Callback receiving the logger instance
   * @returns The logger instance (for chaining or reference)
   */
  (cb: (l: SceLog) => void): SceLog;

  /**
   * Retrieve the logger instance directly.
   *
   * @returns The logger instance
   */
  (): SceLog;
}

/**
 * Retrieve or invoke the SCE logging utility.
 *
 * This function provides two usage patterns:
 *
 * 1. **Direct retrieval** — Call without arguments to get the logger instance:
 *    ```typescript
 *    const logger = log();
 *    logger.log("Message");
 *    ```
 *
 * 2. **Callback-based** — Pass a callback for imperative logging:
 *    ```typescript
 *    log((l) => {
 *      l.log("Starting operation");
 *      l.warn("Potential issue detected");
 *    });
 *    ```
 *
 * **Implementation:**
 * Currently wraps the global `console` object. The abstraction enables future
 * enhancements (e.g., log filtering, custom transports, structured logging)
 * without breaking existing callsites.
 *
 * **Thread Safety:**
 * Delegates to the platform's console implementation. In Node.js, console
 * methods are synchronous and thread-safe within a single process.
 *
 * @param cb - Optional callback receiving the logger instance
 * @returns The logger instance (native console)
 *
 * @example
 * ```typescript
 * // Pattern 1: Direct assignment
 * const logger = log();
 * logger.log("Symbol count:", 42);
 * logger.error("Validation error:", error);
 *
 * // Pattern 2: Callback-based
 * log((l) => {
 *   l.log("Initializing ontology");
 *   l.debug("Loaded definitions:", definitions);
 * });
 *
 * // Pattern 3: Chaining
 * log((l) => l.warn("Deprecated API")).log("Continuing...");
 * ```
 */
export const log: LogOverloads = (cb?: (l: SceLog) => void): SceLog => {
  const logger = console;
  if (cb) {
    cb(logger);
  }
  return logger;
};
