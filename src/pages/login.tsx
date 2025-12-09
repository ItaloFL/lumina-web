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
    window.location.href = `${env.VITE_BASEURL_API}/google`;
  }

  async function loginWithGithub() {
    window.location.href = `${env.VITE_BASEURL_API}/github`;
  }

  return (
    <div className="max-w-4/5">
      <Helmet>
        <title>Lumina | Login</title>
        <meta
          name="description"
          content="Bem vindo à pagina de login da Lumina Stack"
        />
      </Helmet>

      <div className="flex flex-col items-center">
        <div className="flex gap-2 items-center mb-3">
          <img
            src={LuminaIcon}
            className="bg-[#000000] size-8 xl:size-10"
            alt=""
          />
          <p className="font-semibold text-3xl xl:text-4xl">Lumina</p>
        </div>
        <span className="mb-2 text-base font-semibold xl:text-lg">
          Digite seu email e senha para realizar o login
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-3">
        <Button
          onClick={loginWithGithub}
          className="h-10 xl:h-12 cursor-pointer text-md"
        >
          <FaGithub className="size-5" />
          Logue com o Github
        </Button>

        <Button
          onClick={loginWithGoogle}
          className="h-10 xl:h-12 cursor-pointer text-md"
        >
          <FaGoogle className="size-5" />
          Logue com o Google
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3 "
      >
        <Label className="text-[12px] xl:text-sm uppercase">Email</Label>
        <Input
          className="h-11 xl:h-12 bg-[#18181B] border-[#000000] transition-all focus:border-[#b24a6b]"
          placeholder="Digite seu email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Label className="text-[12px] xl:text-sm uppercase">Senha</Label>
        <Input
          className="h-11 xl:h-12 bg-[#18181B] border-[#000000] transition-all focus:border-[#b24a6b]"
          placeholder="Digite sua senha"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          className="flex items-center mt-3 h-10 xl:h-12 cursor-pointer text-base transition-colors bg-[#AF385D] hover:bg-[#912547]"
        >
          Login
        </Button>

        <div className="flex justify-between">
          <Link
            to="register"
            className="transition-colors cursor-pointer text-[#AF385D] font-semibold text-sm hover:text-[#b24a6b]"
          >
            Criar uma conta
          </Link>

          <Link
            to="forgot-password"
            className="transition-colors cursor-pointer text-[#AF385D] font-semibold text-sm hover:text-[#b24a6b]"
          >
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </div>
  );
}
