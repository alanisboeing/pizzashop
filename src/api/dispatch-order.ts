import { api } from "@/lib/axios";
export interface DispatchOrderParam {
  orderId: string;
}


export async function dispatchOrder({ orderId }: DispatchOrderParam) {
    await api.patch(`/orders/${orderId}/dispatch`);
}
