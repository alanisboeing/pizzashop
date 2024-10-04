import { api } from "@/lib/axios";

type PopularProductsResponse = {
  product: string;
  amount: number;
}[]

export async function getPopularProducts() {
  const res = await api.get("/metrics/popular-products");
  return res.data as PopularProductsResponse
}
