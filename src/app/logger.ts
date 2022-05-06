import { AnyForUntypedForms } from '@angular/forms';
import { environment } from '../environments/environment';
import { LogLevel } from './log-level';

/** Shared logger class.
 * It is a static class. So, initialization is not needed.
 * User can use each logging function directly w/o making instance.
 */
export class Logger {
  static readonly trace = Logger.getPrintFn(LogLevel.Trace);
  static readonly debug = Logger.getPrintFn(LogLevel.Debug);
  static readonly info = Logger.getPrintFn(LogLevel.Info);
  static readonly warning = Logger.getPrintFn(LogLevel.Warning);
  static readonly error = Logger.getPrintFn(LogLevel.Error);

  /** Select print function by logging level.
   * Logging level is defined at 'environment.ts'.
   */
  private static getPrintFn(
    logLevel: LogLevel
  ): (...optionalParams: any[]) => void {
    if (logLevel < environment.logLevel) {
      return Logger.doNothingFn;
    } else {
      if (logLevel == LogLevel.Trace) {
        return this.printTrace;
      } else if (logLevel == LogLevel.Debug) {
        return this.printDebug;
      } else if (logLevel == LogLevel.Info) {
        return this.printInfo;
      } else if (logLevel == LogLevel.Warning) {
        return this.printWarning;
      } else if (logLevel == LogLevel.Error) {
        return this.printError;
      } else {
        return Logger.doNothingFn;
      }
    }
  }

  /** Dummy function doing nothing. */
  private static doNothingFn(...optionalParams: any[]) {}

  /** Print caller function name.
   * It generate a dummy error, and get caller context from the stack trace information.
   *
   * @param{any[]} optionalParams    Not used.
   * @returns{void}
   */
  static printTrace(...optionalParams: any[]): void {
    // Generate a dummy error.
    const e = new Error('Dummy error for stack trace.');

    // Split stack trace by line feeds, and remove 'at ' text.
    // Output caller context if it's available.
    if (e.stack != null) {
      let context: string = e.stack.split(/\r\n|\r|\n/)[2];
      let index: number = context.indexOf('at ') + 3; // '3': Length of 'at '.
      if (index >= 0) {
        context = context.substring(index);
      }
      index = context.indexOf('(') - 1;
      if (index >= 0) {
        context = context.substring(0, index);
        console.log(`[TRC] ${context}()`);
      }
    }
    return;
  }

  private static printDebug(...optionalParams: any[]): void {
    this.printBase(console.debug, '[DBG]', optionalParams);
  }
  private static printInfo(...optionalParams: any[]): void {
    this.printBase(console.info, '[INF]', optionalParams);
  }
  private static printWarning(...optionalParams: any[]): void {
    this.printBase(console.warn, '[WRN]', optionalParams);
  }
  private static printError(...optionalParams: any[]): void {
    this.printBase(console.error, '[ERR]', optionalParams);
  }

  /** Common process of logging functions.
   * The following functions are based on this function:
   * - this.printDebug()
   * - this.printInfo()
   * - this.printWarning()
   * - this.printError()
   * This function format text and output text by input logging function.
   *
   * @param{function} printFn     Print function. console.XXXX() is assumed.
   *                              'printFn' is used for output log text.
   * @param{string} prefix        Prefix text put at the head of each log record.
   * @param{any[]} optionalParams These parameters are input into 'printFn'.
   * @returns{void}
   */
  private static printBase(
    printFn: (...optionalParams: any[]) => void,
    prefix: string,
    ...optionalParams: any[]
  ): void {
    // Input top parameter only, if the list length is 1.
    if (optionalParams[0].length == 1) {
      printFn(prefix, optionalParams[0][0]);
    }
    // Input parameter list, if the list length is larger than 1.
    else if (optionalParams[0].length > 1) {
      // Connect prefix and the top parameter, if it's string type.
      if (typeof optionalParams[0][0] == 'string') {
        let tmpText = optionalParams[0][0];
        optionalParams[0].shift();
        printFn(`${prefix} ${tmpText}`, optionalParams[0]);
      }
      // If not, print all parameters as is.
      else {
        printFn(prefix, optionalParams[0]);
      }
    }
    // Unexpected.
    else {
      console.assert(false, 'Invalid param: optionalParams');
    }
    return;
  }
}
