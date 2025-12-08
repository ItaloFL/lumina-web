import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Camera, CalendarIcon, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DatePickerCalendar } from "@/components/date-pick-calendar";

interface UserProfile {
  name: string;
  email: string;
  dateOfBirth?: string;
  image_url?: string;
}

export function ProfileDashboard() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/profile");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      image: undefined as File | undefined,
    },
  });

  // Preenche valores
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth ?? "",
      });

      if (data.dateOfBirth) {
        setDate(new Date(data.dateOfBirth));
      }

      setPreview(data.image_url || null);
    }
  }, [data]);

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value as any);
      });

      await api.put("/profile/update", form);
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!", {
        position: "bottom-right",
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil", {
        position: "bottom-right",
      });
    },
  });

  const { mutateAsync: userLogout } = useMutation({
    mutationFn: async () => {
      await api.post("/logout");
    },
    onSuccess: () => {
      toast.success("Logout realizado com sucesso", {
        position: "bottom-right",
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Algo deu errado", {
        position: "bottom-right",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Carregando perfil...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Erro ao carregar perfil
      </div>
    );
  }

  async function handleLogout() {
    await userLogout();
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setValue("image", file);
  }

  async function onSubmit(formData: any) {
    if (date) {
      formData.dateOfBirth = date.toISOString();
    }
    await updateUser(formData);
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] px-4 relative">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition shadow cursor-pointer"
      >
        <LogOut size={16} />
        Sair
      </button>

      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#0F0F0F] shadow-xl p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative">
                <img
                  src={preview || "https://via.placeholder.com/120"}
                  className="w-28 h-28 rounded-full object-cover border border-zinc-700"
                  alt="Foto de perfil"
                />

                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full shadow hover:scale-110 transition cursor-pointer"
                >
                  <Camera size={16} />
                </label>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </div>

              <h2 className="text-xl font-semibold text-white mt-4">
                {data.name}
              </h2>
              <p className="text-sm text-zinc-400">{data.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className="text-zinc-300">Nome</Label>
                <Input
                  {...register("name")}
                  className="bg-[#18181B] border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-zinc-300">Email</Label>
                <Input
                  {...register("email")}
                  disabled
                  className="bg-[#18181B] border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-zinc-300">Data de nascimento</Label>

                <div className="bg-[#18181B] border border-zinc-700 rounded-md">
                  <DatePickerCalendar
                    value={date}
                    onChange={(newDate) => {
                      setDate(newDate);
                      setValue(
                        "dateOfBirth",
                        newDate ? newDate.toISOString() : ""
                      );
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-zinc-300">Localidade</Label>
                <Input
                  placeholder="Nova York, EUA"
                  disabled
                  className="bg-[#18181B] border-zinc-700 text-white cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <Button
                type="submit"
                disabled={isPending}
                className="mt-3 h-10 cursor-pointer"
              >
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
