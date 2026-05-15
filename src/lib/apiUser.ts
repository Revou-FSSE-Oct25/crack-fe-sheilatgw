import { apiClient } from "@/lib/apiClient"

export type UserProfile = {
  username: string
  fullName: string
  email: string
  birthDate?: string | null
  createdAt: string
}

export function getUserProfile() {
  return apiClient("/user/me")
}