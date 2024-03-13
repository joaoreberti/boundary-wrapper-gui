import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ConnectToTarget, SetupDBeaverConfig } from "../../wailsjs/go/main/App";
import { CheckIcon } from "@heroicons/react/24/outline";

export type Credentials = {
  Username?: string;
  Password?: string;
  Port?: string;
  ID?: string;
};

export default function Modal({
  currentTarget,
  useModal,
  setModal,
  handleConnection,
}: {
  currentTarget: string;
  useModal: boolean;
  setModal: (value: boolean) => void;
  handleConnection: (value: Credentials, dbClient: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);
  const [dbName, setDbName] = useState("");

  const [credentials, setCredentials] = useState<Credentials>({});
  const [connected, setupConnected] = useState(false);
  const [dbClientState, setupDbClientState] = useState(false);

  const handleConnect = async () => {
    ConnectToTarget(currentTarget)
      .then((credentials) => {
        setCredentials(credentials);
        setupConnected(true);
        handleConnection(credentials, false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setUpDbClient = () => {
    SetupDBeaverConfig(credentials, dbName)
      .then((resp) => {
        console.log("setting up db client");
        if (resp) {
          setupDbClientState(true);
          setModal(false);
          handleConnection(credentials, true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Transition.Root show={useModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setModal}
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
                      Introduce database
                    </Dialog.Title>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    {credentials?.Username ? (
                      <div>
                        <CheckIcon
                          className="h-6 w-6 text-green-400"
                          aria-hidden="true"
                        />
                        <div className="font-semibold leading-8">
                          Credentials
                        </div>
                        <div>
                          Username:<span> {credentials.Username}</span>
                        </div>
                        <div>
                          <span>Password: {credentials.Password}</span>
                        </div>
                        <div>
                          <span>Port: {credentials.Port}</span>
                        </div>
                        <div>
                          <span>
                            Database:{" "}
                            <input
                              onChange={(e) => {
                                setDbName(e.target.value);
                              }}
                              type="text"
                              value={dbName}
                              name={currentTarget}
                              id={currentTarget}
                              autoComplete={currentTarget}
                              className="flex-1 border-8 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="database name"
                            />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {credentials.Username ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={setUpDbClient}
                    >
                      Setup DBeaver
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => handleConnect()}
                    >
                      Connect
                    </button>
                  )}

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setModal(false)}
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
