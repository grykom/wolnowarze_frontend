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
    let likesStorage = JSON.parse(localStorage.getItem(`likes`));
    if (!likesStorage) likesStorage = []

    const [modalIsOpen, setIsOpen] = useState(true);
    const [receipe, setReceipe] = useState();
    const [receipeReady, setReceipeReady] = useState(false);
    const [receipeObj, setReceipeObj] = useState({})
    const [likesNum, setLikesNum] = useState(0);
    const [meLike, setMeLike] = useState(false);

    useEffect(() => {
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id)
            .then(res => res.json())
            .then(data => {
                setReceipe(data);
                setReceipeReady(true);
                setLikesNum(data.likes);
                
                const receipeObj = {
                    r_id: data.receipe_id,
                    r_name: data.name
                }
                setReceipeObj(receipeObj)          
            })
    }, [receipe_id])

    useEffect(() => {
        likesStorage.filter(item => JSON.stringify(item) === JSON.stringify(receipeObj)).length > 0 && setMeLike(true)
    }, [likesStorage, receipeObj])

    function closeModal() {
        setIsOpen(false);
        history.push('/');
    }
    function likeIt() {
        setLikesNum(likes => likes + 1);
        setMeLike(true);
        likesStorage.push(receipeObj);
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id + "?likes_counter=up");
    }
    function dislikeIt() {
        setLikesNum(likes => likes - 1);
        setMeLike(false);
        likesStorage = likesStorage.filter(item => JSON.stringify(item) !== JSON.stringify(receipeObj));
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id + "?likes_counter=down");
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
                            {receipe.images.map((image, idx) => <img key={idx} className="img-fluid img-receipe" src={receipe.images[idx]} alt="{receipe.name}" />)}
                        </Carousel>                    
                        <div className="card-body pt-0">
                            <h4 className="col card-title text-primary">{receipe.name}</h4>                            
                                    
                            <div className="row bordered">
                                <p className="card-text col-12 col-lg-6">                                
                                    <small>Odsłon: {receipe.views}</small>                                
                                </p>
                                <p className="card-text col-12 col-lg-6 text-right">                                
                                    <small>Polubień: {likesNum}</small>
                                </p>
                            </div>
                            <div className="row mb-3">
                                <p className="card-text col-12 col-lg-6">                                
                                    <i className='fas text-primary fa-clock mr-1'></i> Czas na HIGH: {receipe.time_on_high}<br />
                                    <i className='fas text-primary fa-clock mr-1'></i> Czas na LOW: {receipe.time_on_low}
                                </p>
                                <p className="card-text col-12 col-lg-6 text-right">
                                    Liczba porcji: {receipe.serving_size}<br />
                                    Czas przygotowania: {receipe.preparing_time}                                
                                </p>
                            </div>                        
                            <div className="row">
                                <p className="card-text col-12 col-lg-4" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Składniki</h5>' + receipe.receipe_ingredients}}></p>
                                <p className="card-text col-12 col-lg-8" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Sposób przygotowania</h5>' + receipe.receipe_how_to}}></p>
                            </div>
                            <div className="text-right mt-2">
                                <button className={`btn btn-sm btn-default ${meLike && "btn-active"}`} onClick={meLike?dislikeIt:likeIt}>Lubię to! <i className='fas text-primary fa-thumbs-up ml-2'></i></button>
                                <button className="btn btn-sm btn-default">Drukuj <i className='fas text-primary fa-print ml-2'></i></button>
                                <button className="btn btn-sm btn-default">Dodaj do ulubionych <i className='fas text-primary fa-list ml-2'></i></button>
                            </div>
                        </div>
                    </div>
                : <h3>Ładowanie przepisu...</h3>}
            </Modal>
        </div>
  );
}

export default ReceipeModal

