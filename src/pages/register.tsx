import { useState } from "react";
import { DatePickerCalendar } from "@/components/date-pick-calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import LuminaIcon from "../assets/lumina-icon.svg";


export function Register() {
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <>
      <div className="flex gap-2 items-center mb-3">
        <img src={LuminaIcon} className="bg-[#000000] size-8" alt="" />
        <p className="font-semibold text-2xl">Lumina</p>
      </div>

      <span className="mb-1">
        Digite suas informações abaixo para criar sua conta
      </span>

      <form className="mt-4 flex flex-col gap-3">
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

          <input
            id="perfilImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <Label>Nome completo</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite seu nome completo"
        />

        <Label>Email</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite seu email"
        />

        <Label>Senha</Label>
        <Input
          className="w-[500px] h-11 bg-[#18181B] text-white outline-none border border-zinc-700"
          placeholder="Digite sua senha"
        />

        <DatePickerCalendar />

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
