import { apiFetch } from "@/lib/api"

type LoginPayload = {
  identifier: string
  password: string
}

export async function login(payload: LoginPayload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}