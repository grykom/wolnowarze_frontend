import React from 'react';
import Modal from 'react-modal';
import { Link, useParams, useHistory } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ModalComponent(props) {
  let history = useHistory();
  let { id } = useParams();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    history.push('/');    
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal {id}</div>
        <div class="card h-100">
					  <img class="card-img-top" src="http://placehold.it/300x200" alt="" qwu7so1f5="" />
					  <div class="card-body">
						<h4 class="card-title">Card title</h4>
						<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus totam ut praesentium aut.</p>
					  </div>
					  <div class="card-footer">
						<a href="#" class="btn btn-primary">Find Out More!</a>
					  </div>
					</div>
      </Modal>
    </div>
  );
}

export default ModalComponent

