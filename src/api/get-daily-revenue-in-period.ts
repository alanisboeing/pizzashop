import { api } from "@/lib/axios";

type DailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[]

export async function getDailyRevenueInPeriod() {
  const res = await api.get("/metrics/daily-receipt-in-period");
  return res.data as DailyRevenueInPeriodResponse
}
