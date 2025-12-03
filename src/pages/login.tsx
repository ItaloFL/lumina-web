import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Login() {
  return (
    <div className="grid grid-cols-2 h-screen text-white">
      <div className="bg-[#18181B] flex flex-col justify-between p-10">
        <div className="flex gap-2">
          <span className="block size-9 bg-zinc-300 rounded-md"></span>
          <p className="font-semibold text-2xl">Lumina</p>
        </div>

        <span className="text-xl">"Isso aqui vai ser uma grande frase"</span>
      </div>
      <div className="bg-[#000000] flex flex-col items-center justify-center">
        <div className="flex gap-2 items-center mb-2">
          <span className="block size-8 bg-zinc-300 rounded-md"></span>
          <p className="font-semibold text-2xl">Lumina</p>
        </div>
        <span className="mb-1 ">
          Digite seu email e senha para realizar o login
        </span>

        <div className="flex flex-col gap-4 mt-3 w-[500px]">
          <Button className="h-10 cursor-pointer">
            <FaGithub />
            Logue com o Github
          </Button>

          <Button className="h-10 cursor-pointer">
            <FaGoogle />
            Logue com o Google
          </Button>
        </div>

        <form className="mt-4 flex flex-col gap-3 ">
          <Label>Email</Label>
          <Input
            className="w-[500px] h-11 bg-[#18181B] outline-none border-none focus:border"
            placeholder="Digite seu email"
          />

          <Label>Senha</Label>
          <Input
            className="w-[500px] h-11 bg-[#18181B] outline-none border-none focus:border"
            placeholder="Digite sua senha"
          />

          <Button type="submit" className="mt-3 h-10 cursor-pointer">
            Login
          </Button>
          <div className="flex justify-between">
            <a className="transition-colors cursor-pointer hover:text-[#e6e5e5] ">
              Criar uma conta
            </a>

            <a className="transition-colors cursor-pointer hover:text-[#e6e5e5] ">
              Esqueci minha senha
            </a>
          </div>
        </form>

        <div className="absolute bottom-5 right-5 flex gap-2">
          <Button className="cursor-pointer">
            <FaGithub className="size-5" />
          </Button>

          <Button className="cursor-pointer">
            <FaLinkedin className="size-5" />
          </Button>

          <Button className="cursor-pointer">
            <FaInstagram className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
