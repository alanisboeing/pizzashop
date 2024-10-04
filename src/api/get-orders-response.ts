import { api } from "@/lib/axios";

export interface GetOrderQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName: string | null;
  status?: string | null;
}

export interface getOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
    orderId: string;
    customerName: string;
    status: string;
  };
}

export async function getOrdersResponse({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrderQuery) {
  const res = await api.get<getOrdersResponse>("/orders", {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  });
  return res.data;
}
