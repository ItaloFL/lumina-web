import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LuminaIcon from "../assets/lumina-icon.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { env } from "@/env";

const loginUserSchema = z.object({
  email: z
    .email({
      error: "Digite um email válido",
    })
    .nonempty("Digite um email"),
  password: z
    .string("Digite uma senha")
    .min(5, { error: "A senha de ter no minímo 5 caracteres" }),
});

type UserFormSchema = z.infer<typeof loginUserSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(loginUserSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: async (dataUser: UserFormSchema) => {
      const { data } = await api.post("/login", dataUser);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso", {
        position: "bottom-right",
        autoClose: 2500,
      });

      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erro ao realizar login, verifique suas credenciais",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    },
  });

  async function onSubmit(data: UserFormSchema) {
    await loginUser(data);
  }

  async function loginWithGoogle() {
    window.location.href = `${env.VITE_BASEURL_API}google`;
  }

  async function loginWithGithub() {
    window.location.href = `${env.VITE_BASEURL_API}github`;
  }

  return (
    <>
      <Helmet>
        <title>Lumina | Login</title>
        <meta
          name="description"
          content="Bem vindo à pagina de login da Lumina Stack"
        />
      </Helmet>

      <div className="flex gap-2 items-center mb-2">
        <img src={LuminaIcon} className="bg-[#000000] size-8" alt="" />
        <p className="font-semibold text-2xl">Lumina</p>
      </div>
      <span className="mb-1 ">
        Digite seu email e senha para realizar o login
      </span>

      <div className="flex flex-col gap-4 mt-3 w-[500px]">
        <Button onClick={loginWithGithub} className="h-10 cursor-pointer">
          <FaGithub />
          Logue com o Github
        </Button>

        <Button onClick={loginWithGoogle} className="h-10 cursor-pointer">
          <FaGoogle />
          Logue com o Google
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3 "
      >
        <Label>Email</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] outline-none border-none focus:border"
          placeholder="Digite seu email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Label>Senha</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] outline-none border-none focus:border"
          placeholder="Digite sua senha"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button type="submit" className="mt-3 h-10 cursor-pointer">
          Login
        </Button>
        <div className="flex justify-between">
          <Link
            to="register"
            className="transition-colors cursor-pointer hover:text-[#e6e5e5] "
          >
            Criar uma conta
          </Link>

          <Link
            to="forgot-password"
            className="transition-colors cursor-pointer hover:text-[#e6e5e5] "
          >
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </>
  );
}
