import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import LuminaIcon from "../assets/lumina-icon.svg";

export function Layout() {
  return (
    <div className="grid grid-cols-1 h-screen text-white xl:grid-cols-2">
      <div className="hidden bg-[#18181B] xl:flex flex-col justify-between p-10">
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

        <div className="absolute bottom-5 right-5 flex gap-4">
          <Link
            to="https://github.com/ItaloFL/lumina-web"
            target="_blank"
            className="flex items-center justify-center size-11 rounded-md cursor-pointer transition-colors hover:bg-[#27272A]"
          >
            <FaGithub className="size-5" />
          </Link>

          <Link
            to="https://www.linkedin.com/in/italo-ferreira-dev/"
            target="_blank"
            className="flex items-center justify-center size-11 rounded-md cursor-pointer transition-colors hover:bg-[#27272A]"
          >
            <FaLinkedin className="size-5" />
          </Link>

          <Link
            to="https://www.instagram.com/italonfl/"
            target="_blank"
            className="flex items-center justify-center size-11 rounded-md cursor-pointer transition-colors hover:bg-[#27272A]"
          >
            <FaInstagram className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
