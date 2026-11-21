const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

/** Convert Western digits to Persian digits. Leaves non-digits unchanged. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function formatPersianPercent(value: number): string {
  return `${toPersianDigits(value)}٪`;
}
