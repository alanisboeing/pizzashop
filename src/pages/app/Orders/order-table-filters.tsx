import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export const OrdersFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFilterSchemaType = z.infer<typeof OrdersFilterSchema>;

export function OrderTableFilters() {
  const [searchParamns, setSearchParamns] = useSearchParams();

  const orderId = searchParamns.get("orderId");
  const customerName = searchParamns.get("customerName");
  const status = searchParamns.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrdersFilterSchemaType>({
    resolver: zodResolver(OrdersFilterSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? 'all',
    },
  });

  function handleFilterSubmit({
    orderId,
    customerName,
    status,
  }: OrdersFilterSchemaType) {
    setSearchParamns((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set('page', '1')
      return state;
    });
  }

  function handleClearFilters(){
    setSearchParamns((state)=>{
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.delete('page')

      return state
    })
    reset({
      orderId: '',
      customerName: '',
      status: 'all'
    })
  
  }

  
  return (
    <form
      onSubmit={handleSubmit(handleFilterSubmit)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        {...register("orderId")}
        placeholder="Id do pedido"
        className="h-8 w-auto"
      />
      <Input
        {...register("customerName")}
        placeholder="Nome do cliente"
        className="h-8 w-[325px]"
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange, disabled, name } }) => {
          return (
            <Select
              value={value}
              disabled={disabled}
              name={name}
              defaultValue="all"
              onValueChange={onChange}
            >
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" disabled>
                  Status
                </SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      ></Controller>
      <Button type="submit" variant={"secondary"} size={"xs"}>
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button onClick={handleClearFilters} type="button" variant={"outline"} size={"xs"}>
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
