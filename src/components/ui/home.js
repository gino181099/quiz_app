import { RotateCw } from "lucide-react";

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
import { database } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export function HomeComponent({ className, all, set }) {
  const functionsDoc = doc(database, "functions", "all");

  useEffect(() => {
    getDoc(functionsDoc).then(
      (doc) => (
        doc.data().firstAllow == true
          ? set((prevState) => ({
              ...prevState,
              firstAllow: true,
            }))
          : set((prevState) => ({
              ...prevState,
              firstAllow: false,
            })),
        doc.data().secondAllow == true
          ? set((prevState) => ({
              ...prevState,
              secondAllow: true,
            }))
          : set((prevState) => ({
              ...prevState,
              secondAllow: false,
            }))
      )
    );
  }, []);

  // const updateDoc = () =>
  //   setDoc(functionsDoc, { firstAllow: true }, { merge: true });

  const refresh = () => window.location.reload(true);
  return (
    <Card className={cn("w-[380px] adapt an", className)}>
      <CardHeader>
        <CardTitle>Haz iniciado sesión</CardTitle>
        <CardDescription>
          Debes esperar a que el anfitrión habilite el quiz
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground">
              Una vez habilitado el quiz deberías ver el botón que te permite
              jugar, sino debes recargar el sitio.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {all.firstAllow & !all.firstDone ? (
          <Button
            className="w-full an2"
            variant="destructive"
            onClick={() => (
              set((prevState) => ({
                ...prevState,
                firstOn: true,
              })),
              localStorage.setItem("iniciado1", "si")
            )}
          >
            Iniciar el quiz 1
          </Button>
        ) : (
          ""
        )}
        {all.secondAllow & !all.secondDone ? (
          <Button
            className="w-full an2"
            variant="destructive"
            onClick={() => (
              set((prevState) => ({
                ...prevState,
                secondOn: true,
              })),
              localStorage.setItem("iniciado2", "si")
            )}
          >
            Iniciar el quiz 2
          </Button>
        ) : (
          ""
        )}
        <Button
          className="w-full an2 whitespace-normal h-fit"
          onClick={refresh}
        >
          <RotateCw className="mr-2 h-4 w-4 " /> Recargar el sitio
        </Button>
      </CardFooter>
    </Card>
  );
}
