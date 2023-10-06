export function isNuemric(value: string): boolean {
  return /^[0-9]*$/.test(value);
}

export function formatCurrency(value: number | undefined): string {
  if (value) {
    return Intl.NumberFormat('ko-KR').format(value);
  } else {
    return '0';
  }
}