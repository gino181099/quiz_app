import { Progress } from "@/components/ui/progress";

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
import { useEffect, useState } from "react";
import { database } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";

export function Question({
  title,
  desc,
  one,
  two,
  three,
  four,
  number,
  set,
  all,
  points,
  correct,
  time,
  limit,
  name,
  quizNumber,
}) {
  const [progress, setProgress] = useState(0);
  const dbInstance = collection(database, "users");

  useEffect(() => {
    if ((progress < 100) & (all[number] == true)) {
      setTimeout(() => setProgress((prev) => (prev += 10)), time);
    }
    if (quizNumber == 1) {
      if ((progress == 100) & (number == limit) & (all[number] == true)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          firstOn: false,
          firstDone: true,
        }));
        addDoc(dbInstance, {
          name: name,
          firstPoints: points,
        });
      }
      if ((progress == 100) & (number != limit) & (all[number] == true)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
        }));
      }
    }
    if (quizNumber == 2) {
      if ((progress == 100) & (number == limit) & (all[number] == true)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          secondOn: false,
          secondDone: true,
        }));
        addDoc(dbInstance, {
          name: name,
          secondPoints: points,
        });
      }
      if ((progress == 100) & (number != limit) & (all[number] == true)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
        }));
      }
    }
  }, [progress, all]);
  const nextQuestion = (value) => {
    if (quizNumber == 1) {
      if ((number == limit) & (value == correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          firstPoints: all.firstPoints + 1,
          firstOn: false,
          firstDone: true,
        }));
        let oneMore = points + 1;
        addDoc(dbInstance, {
          name: name,
          firstPoints: oneMore,
        });
      }
      if ((number == limit) & (value != correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          firstOn: false,
          firstDone: true,
        }));
        addDoc(dbInstance, {
          name: name,
          firstPoints: points,
        });
      }
      if ((number != limit) & (value == correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
          firstPoints: all.firstPoints + 1,
        }));
      } else {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
        }));
      }
    }
    if (quizNumber == 2) {
      if ((number == limit) & (value == correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          secondPoints: all.secondPoints + 1,
          secondOn: false,
          secondDone: true,
        }));
        let oneMore = points + 1;
        addDoc(dbInstance, {
          name: name,
          secondPoints: oneMore,
        });
      }
      if ((number == limit) & (value != correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [1]: true,
          secondOn: false,
          secondDone: true,
        }));
        addDoc(dbInstance, {
          name: name,
          secondPoints: points,
        });
      }
      if ((number != limit) & (value == correct)) {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
          secondPoints: all.secondPoints + 1,
        }));
      } else {
        set((prevState) => ({
          ...prevState,
          [number]: false,
          [number + 1]: true,
        }));
      }
    }
  };
  return (
    <div
      className={cn(
        `w-[380px] mb-4 adapt an3 ${all[number] == true ? "" : "ocultar"}`
      )}
    >
      <Progress value={progress} max={100} className="mb-4 smooth" />
      <Card>
        <CardHeader>
          <CardTitle>
            Pregunta N° {number}/{limit}
          </CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 options">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => nextQuestion(1)}
          >
            {one}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => nextQuestion(2)}
          >
            {two}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => nextQuestion(3)}
          >
            {three}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => nextQuestion(4)}
          >
            {four}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
