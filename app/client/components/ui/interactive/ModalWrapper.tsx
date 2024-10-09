import Icon from "../../utils/other/Icon";
import { createPortal } from "react-dom";

interface PropType {
  setShowModal: (value: boolean) => void;
  showModal: boolean;
  children: JSX.Element;
  customClass?: string;
}

//Creates a modal that wraps the children passed in. 
//Use portal to render the modal at the top of the DOM
function ModalWrapper({
  setShowModal,
  children,
  customClass,
  showModal,
}: PropType) {
  return (
    <>
      {showModal &&
        createPortal(
          <>
            {" "}
            <div
              className={`absolute font-roboto overflow-auto left-1/2 -translate-x-1/2 z-[50] items-center flex  bg-white max-w-[44em] w-full min-h-[20em] rounded-lg flex-col gap-7 ${customClass}`}
            >
              <button
                data-testid="close-modal"
                onClick={() => setShowModal(false)}
                className="flex absolute top-[0.8em] right-[0.8em] z-[60]"
              >
                <Icon icon="close" />
              </button>
              {children}
            </div>
            <button
              data-testid="modal-background"
              onClick={() => setShowModal(false)}
              className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
            ></button>
          </>,
          document.body
        )}
    </>
  );
}

export default ModalWrapper;
