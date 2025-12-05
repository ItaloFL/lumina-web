import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import LuminaIcon from "../assets/lumina-icon.svg";

export function ForgotPassword() {
  return (
    <>
      <div className="flex gap-2 items-center mb-2">
        <img src={LuminaIcon} className="bg-[#000000] size-8" alt="" />
        <p className="font-semibold text-2xl">Lumina</p>
      </div>
      <span className="mb-1 ">
        Digite seu email abaixo para redefinir sua senha
      </span>

      <form className="mt-4 flex flex-col gap-3 ">
        <Label>Email</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] outline-none border-none focus:border"
          placeholder="Digite seu email"
        />

        <Button type="submit" className="mt-3 h-10 cursor-pointer">
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
    </>
  );
}
