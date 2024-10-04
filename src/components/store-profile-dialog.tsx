import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { putManagedRestaurant } from "@/api/put-managed-restaurant";
import { toast } from "sonner";

const UpdateProfileFormSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

export type UpdateProfileFormSchemaType = z.infer<
  typeof UpdateProfileFormSchema
>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  function uptdateManagedRestaurant({
    name,
    description,
  }: UpdateProfileFormSchemaType) {
    const cached = queryClient.getQueryData([
      "managed-restaurant",
    ]) as UpdateProfileFormSchemaType;

    if (cached) {
      queryClient.setQueryData(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }
    return { cached };
  }
  const { data: managedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    });

  const {
    mutateAsync: putManagedRestaurantBody,
    isPending: isPutManagedRestaurantLoading,
  } = useMutation({
    mutationFn: putManagedRestaurant,
    onMutate({ name, description }) {
      const { cached } = uptdateManagedRestaurant({ name, description });

      return { previousManagedRestaurant: cached };
    },
    onError(_, __, context) {
      if (context?.previousManagedRestaurant) {
        uptdateManagedRestaurant(context.previousManagedRestaurant);
      }
    },
    // onSuccess(_, {name, description}){
    //     const cached = queryClient.getQueryData(['managed-restaurant'])

    //     if(cached){
    //         queryClient.setQueryData(['managed-restaurant'], {
    //             ...cached,
    //             name,
    //             description
    //         })
    //     }
    // }
  });

  const { register, handleSubmit } = useForm<UpdateProfileFormSchemaType>({
    resolver: zodResolver(UpdateProfileFormSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  async function handleUpdateProfile(data: UpdateProfileFormSchemaType) {
    try {
      await putManagedRestaurantBody(data);
      toast.success(`Dados do perfil atualizados com sucesso!`);
    } catch (error) {
      toast.error(`Não foi possível atualizar os dados do perfil.`);
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              {...register("name")}
              className="col-span-3"
              type="text"
              name="name"
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              {...register("description")}
              className="col-span-3"
              name="description"
            ></Textarea>
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant={"ghost"} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
          <Button
            disabled={isPutManagedRestaurantLoading}
            variant={"succes"}
            type="submit"
          >
            Salvar
          </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
