import { Button } from "@/components/ui/button";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Outlet } from "react-router";
import LuminaIcon from "../assets/lumina-icon.svg";

export function Layout() {
  return (
    <div className="grid grid-cols-2 h-screen text-white">
      <div className="bg-[#18181B] flex flex-col justify-between p-10">
        <div className="flex gap-2">
          <span className="block size-9 bg-zinc-300 rounded-md">
            <img src={LuminaIcon} className="bg-[#18181B]" alt="" />
          </span>
          <p className="font-semibold text-2xl">Lumina</p>
        </div>

        <span className="text-lg text-[#afafaf]">
          "Uma stack pensada para produtividade: a Lumina Stack integra
          tecnologias atuais para criar soluções escaláveis, intuitivas e de
          alto padrão."
        </span>
      </div>
      <div className="bg-[#000000] flex flex-col items-center justify-center">
        <Outlet />

        <div className="absolute bottom-5 right-5 flex gap-2">
          <Button className="cursor-pointer transition-colors hover:bg-[#27272A]">
            <FaGithub className="size-5" />
          </Button>

          <Button className="cursor-pointer transition-colors hover:bg-[#27272A]">
            <FaLinkedin className="size-5" />
          </Button>

          <Button className="cursor-pointer transition-colors hover:bg-[#27272A]">
            <FaInstagram className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
