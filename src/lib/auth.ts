import { apiFetch } from "./api"

export async function getMe(token: string, role: string) {
  const endpoint =
    role === "admin"
      ? "/admin/me"
      : "/user/me"

  return apiFetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}