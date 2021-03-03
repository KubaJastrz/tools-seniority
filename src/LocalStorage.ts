function getItem(key: string): unknown;
function getItem<Value>(key: string, fallback: Value): Value;
function getItem<Value>(key: string, fallback?: Value): unknown {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return fallback;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

function setItem(key: string, value: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export const LocalStorage = {
  getItem,
  setItem,
};
