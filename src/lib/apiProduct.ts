import { apiClient } from "@/lib/apiClient"
import { ProductForm } from "@/types/adminProduct"

export function getProducts() {
  return apiClient("/product")
}

export function getCategories() {
  return apiClient("/category")
}

export function getCharacters() {
  return apiClient("/characters")
}

export function getManufacturers() {
  return apiClient("/manufacturers")
}

export function getSeries() {
  return apiClient("/series")
}

export function createProduct(payload: Partial<ProductForm>) {
  return apiClient("/product", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateProduct(id: number, payload: Partial<ProductForm>) {
  return apiClient(`/product/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
}

export function deleteProduct(id: number) {
  return apiClient(`/product/${id}`, {
    method: "DELETE",
  })
}