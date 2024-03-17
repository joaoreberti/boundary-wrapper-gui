import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { StoreEnvs } from "../../wailsjs/go/main/App";

export default function EnvVariablesModal({
  envVariables,
  setEnvVariables,
}: Readonly<{
  envVariables: boolean | null;
  setEnvVariables: (val: boolean) => void;
}>) {
  const cancelButtonRef = useRef(null);
  const [boundaryAddress, setBoundaryAddress] = useState("");
  const [dbeaverPath, setDbeaverPath] = useState("");
  const [boundaryPath, setBoundaryPath] = useState("");
  const [error, setError] = useState("");

  const saveInputs = async () => {
    console.log(boundaryAddress, dbeaverPath, boundaryAddress);
    StoreEnvs(boundaryAddress, dbeaverPath, boundaryPath).then((result) => {
      console.log("store envs", result.message);
      setError(result.message);
      if (result.success === true) {
        setEnvVariables(true);
      } else {
        console.log("error saving envs");
      }
    });
  };

  return (
    <Transition.Root show={envVariables === false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setEnvVariables(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {error ?? "Set env vars"}
                    </Dialog.Title>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div>
                      <span>
                        Boundary Address:{" "}
                        <input
                          onChange={(e) => {
                            setBoundaryAddress(e.target.value);
                          }}
                          type="text"
                          value={boundaryAddress}
                          name={"boundary-address"}
                          id={"boundary-address"}
                          className="flex-1 border-8 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="boundary address"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div>
                      <span>
                        Boundary-cli Path (```which boundary```):{" "}
                        <input
                          onChange={(e) => {
                            setBoundaryPath(e.target.value);
                          }}
                          type="text"
                          value={boundaryPath}
                          name={"boundary-path"}
                          id={"boundary-path"}
                          className="flex-1 border-8 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="boundary path"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div>
                      <span>
                        Dbeaver:{" "}
                        <input
                          onChange={(e) => {
                            setDbeaverPath(e.target.value);
                          }}
                          type="text"
                          value={dbeaverPath}
                          name={"dbeaver-path"}
                          id={"dbeaver-path"}
                          className="flex-1 border-8 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="boundary address"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => saveInputs()}
                  >
                    Connect
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setEnvVariables(true)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
