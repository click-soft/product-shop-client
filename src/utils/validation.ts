const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

export function validEmail(email: string) {
  return !!pattern.test(email);
}
