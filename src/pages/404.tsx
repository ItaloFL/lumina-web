import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LuminaIcon from "../assets/lumina-icon.svg";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Lumina Stack | Não encontrada</title>
      </Helmet>

      <div className="h-screen w-screen flex items-center justify-center bg-[#000000] text-white">
        <div className="flex items-center gap-8">
          <img src={LuminaIcon} className="size-20" alt="" />

          <div className="flex flex-col gap-3">
            <p className="font-bold text-4xl">404</p>
            <span className="text-lg">Página não encontrada!</span>
            <Button>
              <Link to={"/"}>Volte para home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
