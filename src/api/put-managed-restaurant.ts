import { UpdateProfileFormSchemaType } from "@/components/store-profile-dialog";
import { api } from "@/lib/axios";

export async function putManagedRestaurant(
  putRestaurantBody: UpdateProfileFormSchemaType,
) {
  await api.put("/profile", putRestaurantBody);
  // await new Promise((resolve, reject)=> setTimeout(reject, 3000))
}
