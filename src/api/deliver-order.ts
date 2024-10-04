import { api } from "@/lib/axios";
export interface DeliverOrderParam {
  orderId: string;
}


export async function deliverOrder({ orderId }: DeliverOrderParam) {
    await api.patch(`/orders/${orderId}/deliver`);
}
