import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import colors from "tailwindcss/colors";

export function RevenueChart() {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue"],
    queryFn: getDailyRevenueInPeriod,
  });
  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
       { dailyRevenueInPeriod && (
         <ResponsiveContainer width="100%" height={240}>
         <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
           <XAxis axisLine={false} tickLine={false} dy={16} dataKey="date" />
           <YAxis
             stroke="#888"
             axisLine={false}
             tickLine={false}
             width={80}
             tickFormatter={(value: number) => {
               return (value/100).toLocaleString("pt-BR", {
                 style: "currency",
                 currency: "BRL",
               });
             }}
           />
           <CartesianGrid vertical={false} className="stroke-muted" />
           <Line
             type={"linear"}
             strokeWidth={2}
             dataKey="receipt"
             stroke={colors.violet["400"]}
           />
         </LineChart>
       </ResponsiveContainer>
       )}
      </CardContent>
    </Card>
  );
}
