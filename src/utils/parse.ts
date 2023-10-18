import { format, parse } from "date-fns";

export function parseExpiresInToMilliseconds(timeString: string): number {
  const [, value, unit] = /^(\d+)([smhd])$/.exec(timeString) || [];
  if (!value || !unit) {
    throw new Error('올바른 expiresIn 형식이 아닙니다.');
  }

  const multipliers: { [key: string]: number } = {
    s: 1000, // 초
    m: 1000 * 60, // 분
    h: 1000 * 60 * 60, // 시간
    d: 1000 * 60 * 60 * 24, // 일
  };

  return parseInt(value, 10) * multipliers[unit];
}

export function parseExpToDate(exp: string | number) {
  const expInMilliseconds = parseInt(exp.toString()) * 1000;

  // Date 객체를 생성하고 타임스탬프를 설정합니다.
  const expirationDate = new Date(expInMilliseconds);

  return expirationDate;
}

export function ymdToShortString(ymd: string): string {
  if (!ymd) {
    return '';
  }
  try {
    const date = parse(ymd, 'yyyyMMdd', new Date())
    return format(date, "yyyy-MM-dd")
  } catch {
    return '';
  }
}