
export function getLocalStorageKey(key: string, defaultValue: string): string {
  try {
    const result: string | null = localStorage.getItem(key);
    return result ?? defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setLocalStorageKey(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch(e) {
    return false;
  }
}
