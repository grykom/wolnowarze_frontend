import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams, useHistory } from "react-router-dom";

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

function ModalComponent() {
  let history = useHistory();
  let { receipe_id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(true);
  const [receipe, setReceipe] = useState()
  const [receipeReady, setReceipeReady] = useState(false);

  useEffect(() => {
    const url = `http://127.0.0.1:8000/v1/receipes/${receipe_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setReceipe(data)
      setReceipeReady(true)
    })
  }, [])

  function closeModal() {
    setIsOpen(false);
    history.push('/');
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button class="btn btn-secondary float-right btn-block mb-3" onClick={closeModal}>zamknij przepis</button>
        {receipeReady ?
        <div class="card h-100">
					  <img class="card-img-top" src="http://placehold.it/300x200" alt="" qwu7so1f5="" />
					  <div class="card-body">
						<h4 class="card-title">{receipe.name}</h4>
						<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus totam ut praesentium aut.</p>
						<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus totam ut praesentium aut.</p>
						<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus totam ut praesentium aut.</p>
						<p class="card-text">{JSON.stringify(receipe)}</p>
					  </div>
					  <div class="card-footer">
						<a href="#" class="btn btn-primary">Find Out More!</a>
					  </div>
					</div>
          : <h3>Ładowanie przepisu...</h3>}
      </Modal>
    </div>
  );
}

export default ModalComponent

