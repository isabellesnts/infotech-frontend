import api from "./api";

export type AuthUser = {
  id?: number | string;
  nome?: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  authToken?: string;
  user?: AuthUser;
  usuario?: AuthUser;
  data?: AuthUser | { token?: string; accessToken?: string; authToken?: string; user?: AuthUser; usuario?: AuthUser };
};

const loginEndpoints = [
  "/api/login",
  "/api/auth/login",
  "/api/usuarios/login",
  "/login",
  "/api/auth",
  "/api/user/login",
];

function getTokenFromPayload(data: any): string | null {
  const token = data?.token ?? data?.accessToken ?? data?.authToken ?? data?.data?.token ?? data?.data?.accessToken ?? data?.data?.authToken;
  return token ?? null;
}

function getUserFromPayload(data: any): AuthUser | null {
  const user = data?.user ?? data?.usuario ?? data?.data?.user ?? data?.data?.usuario ?? data?.data ?? null;
  return user && typeof user === "object" && !Array.isArray(user) ? user as AuthUser : null;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("auth_token"));
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const payloads = [
    { email, senha },
    { email, password: senha },
    { username: email, password: senha },
  ];

  let lastError: unknown = null;

  for (const endpoint of loginEndpoints) {
    for (const payload of payloads) {
      try {
        const response = await api.post(endpoint, payload);
        const token = getTokenFromPayload(response.data);
        const user = getUserFromPayload(response.data) ?? { email };

        if (token) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_user", JSON.stringify(user));

          return {
            token,
            user,
            ...response.data,
          };
        }
      } catch (error) {
        lastError = error;
      }
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Não foi possível realizar o login.");
}
