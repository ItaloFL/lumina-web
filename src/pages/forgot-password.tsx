import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import LuminaIcon from "../assets/lumina-icon.svg";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

const forgotPasswordSchema = z.object({
  email: z
    .email({
      error: "Digite um email válido",
    })
    .nonempty("Digite um email"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutateAsync: forgotPassword } = useMutation({
    mutationFn: async (dataUser: ForgotPasswordSchema) => {
      const { data } = await api.post("/forgot-password", dataUser);
      return data;
    },
  });

  async function onSubmit(data: ForgotPasswordSchema) {
    await forgotPassword(data);
  }

  return (
    <div className="max-w-4/5">
      <Helmet>
        <title>Lumina Stack | Esqueci minha senha</title>
      </Helmet>

      <div className="flex flex-col items-center">
        <div className="flex gap-2 items-center mb-2">
          <img src={LuminaIcon} className="bg-[#000000] size-8" alt="" />
          <p className="font-semibold text-2xl">Lumina</p>
        </div>
        <span className="mb-1 text-base xl:text-base">
          Digite seu email abaixo para redefinir sua senha
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3 "
      >
        <Label>Email</Label>
        <Input
          className="h-11 bg-[#18181B] outline-none border-none focus:border"
          placeholder="Digite seu email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Button
          type="submit"
          className="mt-3 h-10 cursor-pointer bg-[#AF385D] hover:bg-[#912547]"
        >
          Enviar
        </Button>
        <div className="flex justify-between">
          <Link
            to="/"
            className="transition-colors cursor-pointer hover:text-[#e6e5e5] "
          >
            <span className="underline">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
