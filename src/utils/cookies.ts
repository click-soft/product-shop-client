interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
}

export function getCookie(key: string): string | undefined {
  const cookies = document.cookie.split(";");
  const cookieMap = cookies.reduce((map: Map<string, string>, ck: string) => {
    const [key, value] = ck.split("=");
    map.set(key.trim(), value);
    return map;
  }, new Map<string, string>());

  return cookieMap.get(key);
}

export function clearCookie(key: string): void {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function setCookie(key: string, value: string, options: CookieOptions): void {
  let cookie = `${key}=${value}`;

  if (options.path) {
    cookie += `; path=${options.path}`;
  }

  if (options.expires) {
    const date = options.expires;
    cookie += `; expires=${date.toUTCString()}`;
  } else if (options.maxAge) {
    const expires = new Date();
    expires.setTime(expires.getTime() + options.maxAge * 1000);
    cookie += `; expires=${expires.toUTCString()}`;
  }

  if (options.domain) {
    cookie += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookie += `; secure`;
  }

  if (options.httpOnly) {
    cookie += `; httpOnly`;
  }

  if (options.sameSite) {
    if (typeof options.sameSite === "boolean") {
      cookie += `; sameSite=${options.sameSite ? "Strict" : "Lax"}`;
    } else {
      cookie += `; sameSite=${options.sameSite}`;
    }
  }

  document.cookie = cookie;
}