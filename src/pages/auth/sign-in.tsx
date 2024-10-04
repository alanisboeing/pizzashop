import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signForm = z.object({
  email: z.string().email(),
});

type signForm = z.infer<typeof signForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: signForm) {
    try {
      await authenticate({ email: data.email });
      toast.success(
        `Um link de autenticação foi enviado para o email ${data.email}.`,
      );
    } catch (error) {
      console.log(error);
      toast.error(`Credenciais inválidas`);
    }
  }
  return (
    <div>
      <Helmet title="Login" />
      <div className="p-8">
        {/* asChild faz com que o Link herde apenas o estilo do botão, sem a funcionalidade */}
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to={"/sign-up"}>Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[358px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
