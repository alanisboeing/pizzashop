import { api } from "@/lib/axios";

interface MonthCanceledOrdersAmountResponse {
  diffFromLastMonth: number;
  amount: number;
}

export async function getMonthCanceledOrdersAmount() {
  const res = await api.get("/metrics/month-canceled-orders-amount");
  return res.data as MonthCanceledOrdersAmountResponse
}
