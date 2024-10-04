import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
}

export async function registerRestaurant( registerRestaurantBody: RegisterRestaurantBody) {
  await api.post("/restaurants", registerRestaurantBody);
}
