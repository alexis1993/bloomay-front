import React,{ useState, useCallback } from "react";
import './modal.component.css';
import Modal from 'react-modal';
import { MemoizedContentComponent } from "../content/content.component";

const customStyles = {
    content: {
      top: '25%%',
      left: '50%',
      right: '50%',
      bottom: '25%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const ModalComponent = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
  
    const openModal = useCallback(()=>{
        setIsOpen(true);
    },[])
  
   
    const closeModal = useCallback(()=> {
        setIsOpen(false);
    },[])
  
    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <button className="pull-right" onClick={closeModal}>X</button>
          <div className="space-xs"></div>
          <MemoizedContentComponent/>
        </Modal>
      </div>
    );
  }
  
export default ModalComponent