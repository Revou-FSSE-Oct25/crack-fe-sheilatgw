const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiClient(path: string, options?: RequestInit) {
  const token = localStorage.getItem("access_token")

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}