import {
  Category,
  CreateCategory,
  UpdateCategory,
} from "@/app/_type/categories";
import { fetchData } from "./main";

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  return (await fetchData<Category[]>("/categories")) as Category[];
};

// Fetch a single category
export const fetchCategory = async (id: number): Promise<Category> => {
  return (await fetchData<Category>(`/categories/${id}`)) as Category;
};

// Create a new category
export const createCategory = async (
  data: CreateCategory
): Promise<Category> => {
  return (await fetchData<Category>("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  })) as Category;
};

// Update a category
export const updateCategory = async (
  id: number,
  data: UpdateCategory
): Promise<Category> => {
  return (await fetchData<Category>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as Category;
};

// Delete a category
export const deleteCategory = async (id: number): Promise<boolean> => {
  return await fetchData<boolean>(`/categories/${id}`, {
    method: "DELETE",
  });
};
