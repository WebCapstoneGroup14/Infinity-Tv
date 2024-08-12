import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
  const cancelButtonRef = useRef();

  return (
    <>
      <Transition show={modalOpen} as={Fragment} appear>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto text-center"
          initialFocus={cancelButtonRef}
          onClose={() => setModalOpen(false)}
        >
          <div className="min-h-screen px-4">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0"
            >
              <div className="inline-block align-middle">&#8203;</div>
            </Transition.Child>
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
            <div className="absolute right-5 top-5">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
              >
                <IoClose />
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MainModal;
