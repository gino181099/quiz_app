import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const Provider = ({ children }) => {
  const [name, setName] = useState("");
  const [quizState, setQuizState] = useState({
    firstAllow: false,
    firstDone: false,
    firstOn: false,
    firstPoints: 0,
    secondAllow: false,
    secondDone: false,
    secondOn: false,
    secondPoints: 0,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    time: 1000,
    limit1: 20,
    limit2: 5,
  });
  useEffect(() => {
    const prevName = localStorage.getItem("name");
    const init1 = localStorage.getItem("iniciado1");
    const init2 = localStorage.getItem("iniciado2");
    prevName == null ? "" : setName(prevName);
    init1 == null
      ? ""
      : setQuizState((prevState) => ({
          ...prevState,
          firstDone: true,
        }));
    init2 == null
      ? ""
      : setQuizState((prevState) => ({
          ...prevState,
          secondDone: true,
        }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        name: [name, setName],
        quizState: [quizState, setQuizState],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
