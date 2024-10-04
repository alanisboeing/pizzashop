import { api } from "@/lib/axios";

interface MonthOrdersAmountResponse {
  diffFromLastMonth: number;
  amount: number;
}

export async function getMonthOrdersAmount() {
  const res = await api.get("/metrics/month-orders-amount");
  return res.data as MonthOrdersAmountResponse
}
