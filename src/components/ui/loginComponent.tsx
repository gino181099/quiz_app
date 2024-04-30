import { CircleChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AppContext } from "@/context/Context";

const notifications = [
  {
    title: "Las respuestas son únicas",
    description:
      "No se puede volver atrás, si intentas hacer trampa recargando la página o de otra forma, serás descalificado",
  },
  {
    title: "Tienes tiempo límite",
    description: "Máximo de 15 segundos",
  },
  {
    title: "No cierres la página",
    description: "Debes esperar a que se habilite para poder jugar",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Login({ className, ...props }: CardProps) {
  const { name } = useContext(AppContext);
  const [actualName, setActualName] = useState("");
  const [nm, setNm] = name;

  return (
    <Card className={cn("w-[380px] adapt an", className)} {...props}>
      <CardHeader>
        <CardTitle>Bienvenido</CardTitle>
        <CardDescription>Antes de jugar debes iniciar sesión</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Recomendaciones</p>
            <p className="text-sm text-muted-foreground">
              Unas pequeñas recomendaciones que te pueden resultar útiles
            </p>
          </div>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nombre"
          value={actualName}
          onChange={(e) => setActualName(e.target.value)}
        />
        <Button
          className="w-full"
          onClick={() =>
            actualName != ""
              ? (setNm(actualName),
                localStorage.setItem("name", `${actualName}`))
              : ""
          }
        >
          <CircleChevronRight className="mr-2 h-4 w-4" /> Aceptar
        </Button>
      </CardFooter>
    </Card>
  );
}
