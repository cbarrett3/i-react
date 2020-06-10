import React, { Component } from 'react';
import { CommentSVG } from './Icons/CommentSVG'
import '../styles/Modal.css';

class ModalTrigger extends Component {
  render() {
    return (
      <CommentSVG ref={this.props.buttonRef}
        onClick={this.props.showModal}/>
        // className="modal-button"/>
    //   <button
    //     ref={this.props.buttonRef}
    //     onClick={this.props.showModal}
    //     className="modal-button"
    //   >
        // {/* {this.props.triggerText} */}
    //   </button>
    );
  }
}

export default ModalTrigger;
