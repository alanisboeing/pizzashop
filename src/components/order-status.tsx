export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const OrderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",
  canceled: "Cancelado",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
        
      {["canceled"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {["pending"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {["delivered"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {["processing", "delivering"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {OrderStatusMap[status]}
      </span>
    </div>
  );
}
