export function validEmail(email: string) {
  const pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-za-z0-9-]+/;
  return !!pattern.test(email);
}
