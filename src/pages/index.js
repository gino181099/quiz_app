import { HomeComponent } from "@/components/ui/home";
import { Login } from "@/components/ui/loginComponent";
import { Question } from "@/components/ui/question";

import { Inter } from "next/font/google";
import firstQuestions from "../questions/firstQuestions";
import secondQuestions from "../questions/secondQuestions";
import { useContext } from "react";
import { AppContext } from "../context/Context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { name, quizState } = useContext(AppContext);
  const [nm, setNm] = name;
  const [quiz, setQuiz] = quizState;

  return (
    <main
      className={`flex flex-col items-center justify-between align-center p-24 margin16 ${inter.className}`}
    >
      {nm == "" ? <Login /> : ""}
      {nm == "" ? (
        ""
      ) : quiz.firstOn ? (
        ""
      ) : quiz.secondOn ? (
        ""
      ) : (
        <HomeComponent all={quiz} set={setQuiz} />
      )}
      {(nm != "") & quiz.firstOn & !quiz.firstDone
        ? Object.keys(firstQuestions).map((question, index) => (
            <Question
              set={setQuiz}
              all={quiz}
              key={index}
              title={firstQuestions[index + 1].title}
              desc={firstQuestions[index + 1].desc}
              one={firstQuestions[index + 1].one}
              two={firstQuestions[index + 1].two}
              three={firstQuestions[index + 1].three}
              four={firstQuestions[index + 1].four}
              correct={firstQuestions[index + 1].true}
              number={index + 1}
              points={quiz.firstPoints}
              time={quiz.time}
              limit={quiz.limit1}
              name={nm}
              quizNumber={1}
            />
          ))
        : ""}
      {(nm != "") & quiz.secondOn & !quiz.secondDone
        ? Object.keys(secondQuestions).map((question, index) => (
            <Question
              set={setQuiz}
              all={quiz}
              key={index}
              title={secondQuestions[index + 1].title}
              desc={secondQuestions[index + 1].desc}
              one={secondQuestions[index + 1].one}
              two={secondQuestions[index + 1].two}
              three={secondQuestions[index + 1].three}
              four={secondQuestions[index + 1].four}
              correct={secondQuestions[index + 1].true}
              number={index + 1}
              points={quiz.secondPoints}
              time={quiz.time}
              limit={quiz.limit2}
              name={nm}
              quizNumber={2}
            />
          ))
        : ""}
    </main>
  );
}
