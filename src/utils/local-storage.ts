
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

// function _removeLocalStorageKey(key: string): boolean {
//   try {
//     localStorage.removeItem(key);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

function _clearLocalStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

const SELECTED_TIMEZONES = 'selected-timezones';
const HIGHLIGHT_TIME = 'highlight-time';
const SCHEMA_VERSION = 'schema-version';
const CURRENT_STORAGE_VERSION = '0';

export function upgradeLocalStorageSchema(): void {
  const schemaVersion: string = getLocalStorageKey(SCHEMA_VERSION, '');
  if (schemaVersion === '') {
    _clearLocalStorage();
    setLocalStorageKey(SCHEMA_VERSION, CURRENT_STORAGE_VERSION);
  }
}

export {
  SELECTED_TIMEZONES,
  HIGHLIGHT_TIME
}
