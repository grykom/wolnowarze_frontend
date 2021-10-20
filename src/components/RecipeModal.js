import React, { useRef  } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import ReactToPrint from "react-to-print";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useRecipe from "../hooks/useRecipe.js";

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

function RecipeModal({ setFavs }) {
    let history = useHistory();
    let { recipe_id } = useParams();
    let componentRef = useRef();

    const {
        modalIsOpen,
        closeModal, 
        recipe, 
        recipeReady, 
        likesNum, 
        meLike, 
        meFav, 
        addLike, 
        removeLike, 
        addFav, 
        removeFav
    } = useRecipe(recipe_id, history, setFavs)
    
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button className="btn btn-secondary float-right btn-block mb-3" onClick={closeModal}>zamknij przepis</button>
                {recipeReady ?
                    <div className="card h-100">
                        <Carousel autoPlay={false} showStatus={false} showIndicators={false}>
                            {recipe.images.map((image, idx) => <img key={idx} className="img-fluid img-recipe" src={recipe.images[idx]} alt="{recipe.name}" />)}
                        </Carousel>                    
                        <div className="card-body pt-0 pb-2">
                            <RecipeToPrint recipe={recipe} ref={componentRef} />               
                            
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
                                    <small>Odsłon przepisu: {recipe.views}</small>                                
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

export class RecipeToPrint extends React.PureComponent {
    render() {
        const { recipe } = this.props
        return (
        <div>
            <style>{`@page { margin: 2rem !important; }`}</style>
            <h4 className="card-title text-primary">{recipe.name}</h4>
            <div className="row bordered mb-3">
                <p className="card-text col-12 col-sm-6">                                
                    <i className="fas text-primary fa-angle-double-right mr-1 w-10"></i> Czas na HIGH: {recipe.time_on_high}<br />
                    <i className="fas text-primary fa-angle-right mr-1 w-10"></i> Czas na LOW: {recipe.time_on_low}
                </p>
                <p className="card-text col-12 col-sm-6">
                    <i className="fas text-primary fa-users mr-1 w-10"></i> Liczba porcji: {recipe.serving_size}<br />
                    <i className="far text-primary fa-clock mr-1 w-10"></i> Czas przygotowania: {recipe.preparing_time}                                
                </p>
            </div>                        
            <div className="row">
                <p className="card-text col-12 col-sm-4" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Składniki</h5>' + recipe.recipe_ingredients}}></p>
                <p className="card-text col-12 col-sm-8" dangerouslySetInnerHTML={{__html: '<h5 class="border-bottom">Sposób przygotowania</h5>' + recipe.recipe_how_to}}></p>
            </div>
        </div>
        );
    }
}

export default RecipeModal

