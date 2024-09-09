import { useState } from "react";
import "./App.css";

function Box({ text: text, onClick }: { text: number; onClick: () => void }) {
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
function App() {
  const arrBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  const [indexCarta1, setIndexCarta1] = useState(null);
  const [indexCarta2, setIndexCarta2] = useState(null);
  const [adivinadas, setAdivinadas] = useState([]);
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
            text={
              adivinadas.includes(num) || indexCarta1 === i || indexCarta2 === i
                ? num
                : ""
            }
            onClick={() => handleBoxClick(i)}
          />
        ))}
      </div>
      <button
        onClick={() => {
          if (
            arrBoxes[indexCarta1] === arrBoxes[indexCarta2] &&
            arrBoxes[indexCarta1] != null
          ) {
            setAdivinadas([...adivinadas, arrBoxes[indexCarta1]]);
            setIndexCarta1(null);
            setIndexCarta2(null);
          } else {
            setIndexCarta1(null);
            setIndexCarta2(null);
          }
        }}
      >
        checker
      </button>
    </div>
  );
}

export default App;
