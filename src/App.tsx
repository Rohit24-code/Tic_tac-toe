import { useState } from "react";
import "./App.css";

function App() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [winner, setWinner] = useState("");
  let dummyData=[
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2],
  ]
  const [data, setData] = useState(dummyData);

  const handleReset=()=>{
    setWinner("")
    setData([...dummyData])
  }

  const handleChange = (firstIndex: number, index: number) => {
    setStartGame(!startGame);
    let newData = JSON.parse(JSON.stringify(data));
    newData[firstIndex][index] = startGame ? 1 : 0;

    for (let i = 0; i < newData?.length; i++) {
      let rowIndex = newData[i][0];
      let colIndex = newData[0][i];
      let rowFlag = true;
      let colFlag = true;
      for (let j = 1; j < newData[0]?.length; j++) {
        if (newData[i][j] != rowIndex) {
          rowFlag = false;
          break;
        }
      }

      for (let j = 1; j < newData[0]?.length; j++) {
        if (newData[j][i] != colIndex) {
          colFlag = false;
          break;
        }
      }

      if (
        newData[0][0] === newData[1][1] &&
        newData[1][1] === newData[2][2] &&
        newData[0][0] != 2
      ) {
        console.log("inside")
        // toast.success(`winner is ${newData[0][0] === 1 ? "X" : "O"}`);
        setWinner(newData[0][0] === 1 ? "X" : "O");
      }

      if (
        newData[0][2] === newData[1][1] &&
        newData[1][1] === newData[2][0] &&
        newData[0][2] != 2
      ) {
        // toast.success(`winner is ${newData[0][2] === 1 ? "X" : "O"}`);
        setWinner(newData[0][2] === 1 ? "X" : "O");
      }

      if (rowFlag === true && rowIndex != 2) {
        // toast.success(`winner is ${rowIndex === 1 ? "X" : "O"}`);
        setWinner(rowIndex === 1 ? "X" : "O");
      } else if (colFlag === true && colIndex != 2) {
        // toast.success(`winner is ${colIndex === 1 ? "X" : "O"}`);
        setWinner(colIndex === 1 ? "X" : "O");
      }
    }

    setData([...newData]);
  };

  return (
    <div className="app">

      {winner && <div className="winner">Winner is {winner} </div>}

      <div className="top-wrapper">
        {data?.map((item: number[], firstIndex: number) => {
          let row = item?.map((num: number, index: number) => {
            return (
              <div
                className="num"
                style={{
                  backgroundColor: num === 0 || num === 1 ? "gray" : "white",
                  cursor: num === 0 || num === 1 ? "default" : "pointer",
                }}
                onClick={() =>
                  num === 0 || num === 1 || winner
                    ? {}
                    : handleChange(firstIndex, index)
                }
              >
                {num === 0 ? "O" : num === 1 ? "X" : " "}
              </div>
            );
          });
          return <div className="flex">{row}</div>;
        })}
      </div>

       {
        winner ? <button style={{marginTop:"5px", padding:"15px 65px" , color:"white" , backgroundColor:"black", cursor:"pointer",borderRadius:"5px"}} onClick={handleReset}>Reset</button> : null
       }

    </div>
  );
}

export default App;
