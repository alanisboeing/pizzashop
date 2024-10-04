import { api } from "@/lib/axios";

interface DayOrdersAmountResponse {
  diffFromYesterday: number;
  amount: number;
}

export async function getDayOrdersAmount() {
  const res = await api.get("/metrics/day-orders-amount");
  return res.data as DayOrdersAmountResponse
}
