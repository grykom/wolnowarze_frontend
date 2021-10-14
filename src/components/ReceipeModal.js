import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import API_DATA from "./_ApiData";

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

Modal.setAppElement('#root');

function ReceipeModal() {
    let history = useHistory();
    let { receipe_id } = useParams();
    const [modalIsOpen, setIsOpen] = useState(true);
    const [receipe, setReceipe] = useState()
    const [receipeReady, setReceipeReady] = useState(false);

    useEffect(() => {
    fetch(API_DATA.SINGLE_RECEIPE + receipe_id)
        .then(res => res.json())
        .then(data => {
            setReceipe(data)
            setReceipeReady(true)
        })
    }, [receipe_id])

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
            <button className="btn btn-secondary float-right btn-block mb-3" onClick={closeModal}>zamknij przepis</button>
            {receipeReady ?
                <div className="card h-100">
                    <Carousel autoPlay={false} showStatus={false} showIndicators={false}>
                        {receipe.images.map((image, idx) => <img className="img-fluid img-receipe" src={receipe.images[idx]} alt="{receipe.name}" />)}
                    </Carousel>                    
                    <div className="card-body pt-0">
                        <h4 className="card-title text-primary">{receipe.name}</h4>
                        <div className="flex-row justify-content-between d-flex mb-3">
                            <p className="card-text">                                
                                Czas na HIGH: {receipe.time_on_high}<br />
                                Czas na LOW: {receipe.time_on_low}
                            </p>
                            <p className="card-text">
                                Liczba porcji: {receipe.serving_size}<br />
                                Czas przygotowania: {receipe.preparing_time}                                
                            </p>
                        </div>
                        <div className="row">
                            <p className="card-text col-4" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Składniki</h5>' + receipe.receipe_ingredients}}></p>
                            <p className="card-text col-8" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Sposób przygotowania</h5>' + receipe.receipe_how_to}}></p>
                        </div>
                    </div>
                </div>
            : <h3>Ładowanie przepisu...</h3>}
        </Modal>
    </div>
  );
}

export default ReceipeModal

