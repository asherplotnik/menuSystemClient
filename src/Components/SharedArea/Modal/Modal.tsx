import React, { Component } from "react";
import "./Modal.css";
import Backdrop from "./Backdrop";

interface ModalProps {
  show: boolean;
  modalClosed: Function;
  width: string;
  left: string;
}
class Modal extends Component<ModalProps> {
  shouldComponentUpdate(nextProps: ModalProps) {
    return nextProps.show !== this.props.show;
  }
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            width: this.props.width,
            left: this.props.left,
            transform: this.props.show ? "translateY(0)" : "translateY(-200vh)",
            opacity: this.props.show ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
export default Modal;
