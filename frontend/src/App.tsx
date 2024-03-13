import { useEffect, useState } from "react";
import "./App.css";
import { GetAvailableTargets, Greet } from "../wailsjs/go/main/App";
import Header from "./components/Header";
import TargetList from "./components/TargetList";

export type Targets = {
  ID: string;
  Name: string;
}[];

function App() {
  const [search, setSearch] = useState("");
  const [availableTargets, setAvailableTargets] = useState<Targets>([]);
  const [filteredTargets, setFilteredTargets] = useState<Targets>([]);
  const [connectedTargets, setConnectedTargets] = useState<Targets>([]);

  useEffect(() => {
    if (availableTargets.length === 0) {
      GetAvailableTargets().then((result) => {
        console.log(result);
        setAvailableTargets(result);
      });
    }
    if (search.length > 0) {
      setFilteredTargets(
        availableTargets.filter((target) =>
          target.Name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, availableTargets]);

  return (
    <div id="App">
      <Header search={search} setSearch={setSearch} />
      <TargetList
        availableTargets={
          search.length > 0 ? filteredTargets : availableTargets
        }
      />
    </div>
  );
}

export default App;
