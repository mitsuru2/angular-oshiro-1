/** Logging level definition used by logger.ts. */
export type TLogLevel = 0 | 1 | 2 | 3 | 4;
export namespace TLogLevel {
   export const Trace: TLogLevel = 0
   export const Debug: TLogLevel = 1
   export const Info: TLogLevel = 2
   export const Warning: TLogLevel = 3
   export const Error: TLogLevel = 4
}
