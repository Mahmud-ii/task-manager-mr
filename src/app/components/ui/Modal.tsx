import { ModalProps } from "../../../../types/global-interfaces";

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "scale-100" : "scale-0"}`}>
      <div className="modal-box relative bg-gray-300 p-1 rounded-lg">
        <label
          onClick={() => setModalOpen(false)}
          className="bg-black text-slate-200 px-1.5 py-0.5 cursor-pointer rounded-full hover:bg-opacity-80 absolute right-2 ring-2"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
