/** Serialize and store a value in localStorage. */
export function setItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Read and deserialize an untrusted value from localStorage.
 *
 * Consumers must validate the returned value before using it.
 */
export function getItem(key: string): unknown | null {
  const value = localStorage.getItem(key);

  if (value === null) return null;

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

/** Remove a value from localStorage. */
export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
