
export * from './timezones';
export * from './selected-timezones';
export * from './local-storage';

// eslint-disable-next-line
export function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
