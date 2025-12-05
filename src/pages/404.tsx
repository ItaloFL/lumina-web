import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center gap-8">
        <div>
         
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl">404</p>
          <span className="text-lg">Página não encontrada!</span>
          <Link
            to={`/`}
            className="bg-[#1C5281] text-center p-2 text-white text-xl rounded-md hover:bg-[#29669b] transition-colors"
          >
            Volte para home
          </Link>
        </div>
      </div>
    </div>
  );
}
