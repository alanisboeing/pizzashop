import { api } from "@/lib/axios";

interface MonthRevenueResponse {
  diffFromLastMonth: number;
  receipt: number;
}

export async function getMonthRevenue() {
  const res = await api.get("/metrics/month-receipt");
  return res.data as MonthRevenueResponse
}
