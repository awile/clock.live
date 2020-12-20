
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

export function upgradeLocalStorageSchema(): void {
  const SCHEMA_VERSION = 'schemaVersion';
  const CURRENT_STORAGE_VERSION = '0';
  const schemaVersion: string = getLocalStorageKey('schema-version', '');
  if (!schemaVersion) {
    _clearLocalStorage();
    setLocalStorageKey(SCHEMA_VERSION, CURRENT_STORAGE_VERSION);
  }
}

function _clearLocalStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}
