import { useState } from "react";
import { Targets } from "../App";
import Modal, { Credentials } from "./Modal";

export default function TargetList({
  availableTargets,
}: {
  availableTargets: Targets;
}) {
  const [useModal, setModal] = useState(false);
  const [currentTarget, setCurrentTarget] = useState("");
  const [connectedTargets, setConnectedTargets] = useState<
    Map<string, Credentials>
  >(new Map());

  const handleOnClick = (id: string) => {
    console.log("clicked", id);
    setModal(true);
    setCurrentTarget(id);
  };

  const handleConnection = (value: Credentials, dbClient: boolean) => {
    if (value.ID) {
      connectedTargets.set(value.ID, value);
      setConnectedTargets(connectedTargets);
    }
  };

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {availableTargets.map((availableTarget, i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <ul className="min-w-0 flex-auto">
                <li className="text-sm font-semibold leading-6 text-gray-900">
                  Target: {availableTarget.Name}{" "}
                  {connectedTargets.has(availableTarget.ID) ? (
                    <span className="text-xs text-green-500">Connected</span>
                  ) : (
                    <button
                      className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="button"
                      onClick={() => handleOnClick(availableTarget.ID)}
                    >
                      Connect
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {useModal && (
        <Modal
          useModal={useModal}
          setModal={setModal}
          currentTarget={currentTarget}
          handleConnection={handleConnection}
        />
      )}
    </>
  );
}
