import { api } from "@/lib/axios";

interface GetManagedRestaurant{
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
}

export async function getManagedRestaurant() {
  const res = await api.get("/managed-restaurant");
  return res.data as GetManagedRestaurant;
}
