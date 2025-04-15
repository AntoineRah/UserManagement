interface AuthStore {
  accessToken: string | null;
  expiresIn: number | null;
  setAuthData: (token: string, expiresIn: number) => void;
  clearAuthData: () => void;
}
export type { AuthStore };