import { api } from "@/lib/axios";
export interface ApproveOrderParam {
  orderId: string;
}


export async function approveOrder({ orderId }: ApproveOrderParam) {
    await api.patch(`/orders/${orderId}/approve`);
}
