import { api } from "@/lib/axios";
export interface CancelOrderParam {
  orderId: string;
}


export async function cancelOrder({ orderId }: CancelOrderParam) {
    await api.patch(`/orders/${orderId}/cancel`);
}
