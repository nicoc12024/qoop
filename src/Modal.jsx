import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({
  open,
  setOpen,
  isMotionClicked,
  setIsMotionClicked,
  isColorClicked,
  setIsColorClicked,
}) {
  const handleReduceMotion = () => {
    const newValue = !isMotionClicked;
    setIsMotionClicked(newValue);
    localStorage.setItem("isMotionClicked", JSON.stringify(newValue));
  };

  const handleReduceColor = () => {
    const newValue = !isColorClicked;
    setIsColorClicked(newValue);
    localStorage.setItem("isColorClicked", JSON.stringify(newValue));
  };

  return (
    <Dialog
      className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center"
      open={open}
      onClose={setOpen}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="max-w-[590px] padding-modal mx-2 bg-black relative transform overflow-hidden rounded-[12px] text-white text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex justify-between">
              <h3 className="h3-modal mb-2 font-pilat font-semibold text-[16px] leading-6">
                Accessibility
              </h3>
              <button
                type="button"
                className="rounded-md text-white"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <p className="p-modal font-pilat font-[500] ">
                Use the controls below to customize your web experience.
              </p>
            </div>

            {/* Reduce Color */}
            <div className="flex flex-row justify-between">
              <span className="span-modal font-pilat font-[500] leading-4">
                Reduce color
              </span>
              {/* Checkbox */}
              {isColorClicked ? (
                <div className="cursor-pointer checkbox px-4" onClick={handleReduceColor}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                    height="100%"
                  >
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 9 3 3L20 2"
                    ></path>
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 10v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h11"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="cursor-pointer checkbox px-4" onClick={handleReduceColor}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                    height="100%"
                  >
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-500 border-[1.1px]" />

            {/* Reduce Motion */}
            <div className="flex justify-between">
              <span className="span-modal font-pilat font-[500] leading-4">
                Reduce motion
              </span>
              {/* Checkbox */}
              {isMotionClicked ? (
                <div
                  className="cursor-pointer checkbox px-4"
                  onClick={handleReduceMotion}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                    height="100%"
                  >
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 9 3 3L20 2"
                    ></path>
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 10v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h11"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div
                  className="cursor-pointer checkbox px-4"
                  onClick={handleReduceMotion}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                    height="100%"
                  >
                    <path
                      stroke="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
