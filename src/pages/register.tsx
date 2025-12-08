import { useState } from "react";
import { DatePickerCalendar } from "@/components/date-pick-calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import LuminaIcon from "../assets/lumina-icon.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Controller } from "react-hook-form";
import { Helmet } from "react-helmet-async";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Digite um nome com pelo menos 3 caracteres" })
    .nonempty({ error: "Digite um nome" }),
  email: z
    .email({ error: "Digite um email válido" })
    .nonempty({ error: "Digite um email" }),
  password: z
    .string()
    .min(5, { error: "A senha deve conter pelo menos 5 caracteres" }),
  image: z.instanceof(File, { error: "A imagem é obrigatória" }),
  dateOfBirth: z.date({ error: "A data de nascimento é obrigatória" }),
});

export type UserFormSchema = z.infer<typeof userSchema>;

export function Register() {
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      dateOfBirth: undefined,
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  }

  const { mutateAsync: createUser } = useMutation({
    mutationFn: async (formData: UserFormSchema) => {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as any);
      });

      await api.post("/user", data);
    },
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!", {
        position: "bottom-right",
        autoClose: 2500,
      });

      navigate("/");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erro ao criar Usuário, verifique o conteúdo",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    },
  });

  async function onSubmit(data: UserFormSchema) {
    await createUser(data);
  }

  return (
    <>
      <Helmet>
        <title>Lumina Stack | Cadastro</title>
      </Helmet>

      <div className="flex gap-2 items-center mb-3">
        <img src={LuminaIcon} className="bg-[#000000] size-8" alt="" />
        <p className="font-semibold text-2xl">Lumina</p>
      </div>

      <span className="mb-1">
        Digite suas informações abaixo para criar sua conta
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3"
      >
        <Label>Foto de perfil</Label>

        <div className="flex items-center gap-4">
          <div
            className="
              w-20 h-20
              rounded-full
              bg-zinc-700/30
              overflow-hidden
              flex items-center justify-center
              border-3 border-zinc-600 border-dashed
            "
          >
            {preview ? (
              <img
                src={preview}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                className="w-full opacity-60"
              />
            )}
          </div>

          <Label
            htmlFor="perfilImage"
            className="cursor-pointer text-sm h-10 border border-zinc-600 px-4 py-1 rounded-md bg-[#18181B]"
          >
            Escolher foto
          </Label>

          <Input
            id="perfilImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <Label>Nome completo</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite seu nome completo"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Label>Email</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite seu email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Label>Senha</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite sua senha"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Label>Data de nascimento</Label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePickerCalendar value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}

        <Button type="submit" className="mt-3 h-10 cursor-pointer">
          Cadastrar
        </Button>

        <div className="flex justify-between">
          <Link
            to="/"
            className="transition-colors cursor-pointer hover:text-[#e6e5e5]"
          >
            Já tem uma conta? <span className="underline">Entrar</span>
          </Link>
        </div>
      </form>
    </>
  );
}
