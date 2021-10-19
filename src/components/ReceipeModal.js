import React, { useState, useEffect, useRef  } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import ReactToPrint from "react-to-print";
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

function ReceipeModal({ setFavs }) {
    let history = useHistory();
    let { receipe_id } = useParams();
    let componentRef = useRef();

    const [receipe, setReceipe] = useState();
    const [receipeReady, setReceipeReady] = useState(false);
    
    // storage things
    const [receipeStorageObj, setReceipeStorageObj] = useState({})

    // likes
    let likesStorage = JSON.parse(localStorage.getItem(`likes`));
    if (!likesStorage) likesStorage = []
    const [likesNum, setLikesNum] = useState(0);
    const [meLike, setMeLike] = useState(false);

    // favorites
    let favStorage = JSON.parse(localStorage.getItem('favs'));
    if (!favStorage) favStorage = []  
    const [meFav, setMeFav] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false);
        history.push('/');
    }

    useEffect(() => {
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id)
            .then(res => res.json())
            .then(data => {
                setReceipe(data);
                setReceipeReady(true);
                setLikesNum(data.likes);
                
                const receipeObj = {
                    r_id: data.receipe_id,
                    r_name: data.name,
                    r_slug: data.slug
                }
                setReceipeStorageObj(receipeObj)          
            })
    }, [receipe_id])

    useEffect(() => {
        likesStorage.filter(item => JSON.stringify(item) === JSON.stringify(receipeStorageObj)).length > 0 && setMeLike(true)
    }, [likesStorage, receipeStorageObj])

    function addLike() {        
        setMeLike(true);        
        likesStorage.push(receipeStorageObj);
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id + API_DATA.LIKES_UP, {method: 'POST'})
            .then(res => res.json())
            .then(data => setLikesNum(data.likes))  
    }
    function removeLike() {        
        setMeLike(false);
        likesStorage = likesStorage.filter(item => JSON.stringify(item) !== JSON.stringify(receipeStorageObj));
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id + API_DATA.LIKES_DOWN, {method: 'POST'})
            .then(res => res.json())
            .then(data => setLikesNum(data.likes))        
    }

    useEffect(() => {
        favStorage.filter(item => JSON.stringify(item) === JSON.stringify(receipeStorageObj)).length > 0 && setMeFav(true)
    }, [favStorage, receipeStorageObj])

    function addFav() {
        setMeFav(true);
        favStorage.push(receipeStorageObj);
        localStorage.setItem('favs', JSON.stringify(favStorage));
        setFavs(favStorage);
    }
    function removeFav() {
        setMeFav(false);
        favStorage = favStorage.filter(item => JSON.stringify(item) !== JSON.stringify(receipeStorageObj));
        localStorage.setItem('favs', JSON.stringify(favStorage));
        setFavs(favStorage);
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
                        <div className="card-body pt-0 pb-2">
                            <ReceipeToPrint receipe={receipe} ref={componentRef} />               
                            
                            <div className="text-right mt-2">
                                <button className={`btn btn-sm btn-default ${meLike && "btn-active"}`} onClick={meLike ? removeLike : addLike}>Lubię to! <i className='fas text-primary fa-thumbs-up ml-2'></i></button>
                                <ReactToPrint
                                    trigger={() => <button className="btn btn-sm btn-default">Drukuj <i className='fas text-primary fa-print ml-2'></i></button>}
                                    content={() => componentRef.current}
                                />  
                                <button className={`btn btn-sm btn-default ${meFav && "btn-active"}`} onClick={meFav ? removeFav : addFav}>{meFav ? "Usuń z" : "Dodaj do"} ulubionych <i className='fas text-primary fa-list ml-2'></i></button>
                            </div>  
                            <div className="row">
                                <p className="card-text col-12 col-sm-6 m-0">                                
                                    <small>Odsłon przepisu: {receipe.views}</small>                                
                                </p>
                                <p className="card-text col-12 col-sm-6 m-0 text-right">                                
                                    <small>Polubień: {likesNum}</small>
                                </p>
                            </div>   
                        </div>
                    </div>
                : <h4 className="text-center">Ładowanie przepisu...</h4>}
            </Modal>
        </div>
  );
}

export class ReceipeToPrint extends React.PureComponent {
    render() {
        const { receipe } = this.props
        return (
        <div>
            <style>{`@page { margin: 2rem !important; }`}</style>
            <h4 className="card-title text-primary">{receipe.name}</h4>
            <div className="row bordered mb-3">
                <p className="card-text col-12 col-sm-6">                                
                    <i className="fas text-primary fa-angle-double-right mr-1 w-10"></i> Czas na HIGH: {receipe.time_on_high}<br />
                    <i className="fas text-primary fa-angle-right mr-1 w-10"></i> Czas na LOW: {receipe.time_on_low}
                </p>
                <p className="card-text col-12 col-sm-6">
                    <i className="fas text-primary fa-users mr-1 w-10"></i> Liczba porcji: {receipe.serving_size}<br />
                    <i className="far text-primary fa-clock mr-1 w-10"></i> Czas przygotowania: {receipe.preparing_time}                                
                </p>
            </div>                        
            <div className="row">
                <p className="card-text col-12 col-sm-4" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Składniki</h5>' + receipe.receipe_ingredients}}></p>
                <p className="card-text col-12 col-sm-8" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Sposób przygotowania</h5>' + receipe.receipe_how_to}}></p>
            </div>
        </div>
        );
    }
}

export default ReceipeModal

