import { useState } from "react";
import "./App.css";

function Box({ index, onClick }: { index: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="border-2 h-7 w-7">
      {index}
    </button>
  );
}
function App() {
  const arrBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  const [carta1, setCarta1] = useState(null);
  const [carta2, setCarta2] = useState(null);
  const [enJuego, setEnJuego] = useState(arrBoxes);
  console.log(enJuego);
  const handleBoxClick = (index: number) => {
    if (carta1 === null) {
      setCarta1(index);
    } else if (carta1 !== null && carta2 === null) {
      setCarta2(index);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="grid grid-cols-4 mx-auto">
        {enJuego.map((num) => (
          <Box key={num} index={num} onClick={() => handleBoxClick(num)} />
        ))}
      </div>
      <button
        onClick={() => {
          if (carta1 === carta2 && carta1 != null) {
            setEnJuego(enJuego.filter((x) => x != carta1));
            setCarta1(null);
            setCarta2(null);
          }
        }}
      >
        checker
      </button>
    </div>
  );
}

export default App;
