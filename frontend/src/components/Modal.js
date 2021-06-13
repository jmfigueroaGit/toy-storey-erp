import React from "react";
import ReactDOM from "react-dom";

const MODAL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};

const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};

const Modal = ({ children, isOpen, isClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY} />
      <div style={MODAL} className="modal">
        <div className="content">
          <button className="close" onClick={isClose}>
            <span style={{ color: "#db5050" }} className="close">
              X
            </span>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
