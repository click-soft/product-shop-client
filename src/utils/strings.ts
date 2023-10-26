export function isNuemric(value?: string): boolean {
  if (!value) return false;
  return /^[0-9]*$/.test(value);
}
