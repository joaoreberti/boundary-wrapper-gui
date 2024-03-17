import { useEffect, useState } from "react";
import {
  ConnectToBoundary,
  GetAvailableTargets,
  ValidateEnv,
} from "../wailsjs/go/main/App";
import "./App.css";
import Header from "./components/Header";
import TargetList from "./components/TargetList";
import EnvVariablesModal from "./components/EnvVariablesModal";

export type Targets = {
  ID: string;
  Name: string;
}[];

function App() {
  const [search, setSearch] = useState("");
  const [availableTargets, setAvailableTargets] = useState<Targets>([]);
  const [filteredTargets, setFilteredTargets] = useState<Targets>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [envVariables, setEnvVariables] = useState<boolean | null>(null);

  useEffect(() => {
    if (envVariables === null) {
      ValidateEnv().then((result) => {
        setEnvVariables(result);
      });
    }
    if (envVariables === true && connected === false) {
      console.log("connecting to boundary")
      ConnectToBoundary().then((result) => {
        setConnected(result);
      });
    }

    if (availableTargets.length === 0 && connected === true) {
      console.log("fetching targets");
      GetAvailableTargets().then((result) => {
        setAvailableTargets(result);
      });
    }
    if (search.length > 0 && availableTargets.length > 0) {
      setFilteredTargets(
        availableTargets.filter((target) =>
          target.Name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, availableTargets, connected, envVariables]);

  return (
    <div id="App">
      <Header
        search={search}
        setSearch={setSearch}
        setEnvVariables={setEnvVariables}
      />
      <TargetList
        availableTargets={
          search.length > 0 ? filteredTargets : availableTargets
        }
      />
      {envVariables === false && (
        <EnvVariablesModal
          envVariables={envVariables}
          setEnvVariables={setEnvVariables}
        />
      )}
    </div>
  );
}

export default App;
