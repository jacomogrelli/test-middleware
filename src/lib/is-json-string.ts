export function isJsonString(string: string): boolean {
  try {
    JSON.parse(string);
  } catch {
    return false;
  }

  return true;
}
