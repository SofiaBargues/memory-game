import { useEffect, useState } from "react";
import "./App.css";

function Box({ text, onClick }: { text: number; onClick: () => void }) {
  return (
    <button
      disabled={text ? true : false}
      onClick={onClick}
      className="border-2 h-7 w-7"
    >
      {text}
    </button>
  );
}
let arrBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

function shuffled(arr: number[]): number[] {
  const array = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
arrBoxes = shuffled(arrBoxes);

function App() {
  const [indexCarta1, setIndexCarta1] = useState<number | null>(null);
  const [indexCarta2, setIndexCarta2] = useState<number | null>(null);
  const [adivinadas, setAdivinadas] = useState<number[]>([]);

  useEffect(() => {
    if (indexCarta2 === null) {
      return;
    }
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    if (
      // @ts-ignore
      arrBoxes[indexCarta1] === arrBoxes[indexCarta2] &&
      // @ts-ignore
      arrBoxes[indexCarta1] !== null
    ) {
      // @ts-ignore
      setAdivinadas([...adivinadas, arrBoxes[indexCarta1]]);
      setIndexCarta1(null);
      setIndexCarta2(null);
      return;
    }
    const timeoutId = setTimeout(() => {
      setIndexCarta1(null);
      setIndexCarta2(null);
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [indexCarta2]); // Empty dependency array ensures the effect runs only once

  const handleBoxClick = (index: number) => {
    if (indexCarta1 === null) {
      setIndexCarta1(index);
    } else if (indexCarta1 !== null && indexCarta2 === null) {
      setIndexCarta2(index);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="grid grid-cols-4 mx-auto">
        {arrBoxes.map((num, i) => (
          <Box
            key={i}
            // @ts-ignore
            text={
              adivinadas.includes(num) || indexCarta1 === i || indexCarta2 === i
                ? num
                : ""
            }
            onClick={() => handleBoxClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
