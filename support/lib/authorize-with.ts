export interface AuthorizeOptions {
  token: string;
  scheme?: "Token" | "Bearer";
}

export function authorizeWith({ token, scheme = "Token" }: AuthorizeOptions) {
  return { Authorization: `${scheme} ${token}` };
}
