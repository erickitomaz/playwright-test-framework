export interface AuthHeaderOptions {
  token: string;
  scheme?: "Token" | "Bearer";
}

export function authHeader({ token, scheme = "Token" }: AuthHeaderOptions) {
  return { Authorization: `${scheme} ${token}` };
}
