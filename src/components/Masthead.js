import { useState } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";

import API_DATA from "./_ApiData";
import DataFetcher from "./DataFetcher";

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

function SingleItem({ item }) {
    return (
    <div className="card h-100 mb-4">
        <img className="img-fluid img-search" src={item.images[0]} alt="" />
        <div className="card-body">
            <h4 className="card-title text-primary"><Link to={`/przepis/${item.recipe_id}/${item.slug}`}>{item.name}</Link></h4>
            <div className="row">
                <p className="card-text col-12 col-lg-6"><i className="fas text-primary fa-users mr-1"></i> Liczba porcji: {item.serving_size}</p>
                <p className="card-text col-12 col-lg-6 text-right"><i className="far text-primary fa-clock mr-1"></i>Czas przygotowania: {item.preparing_time}</p>
            </div>
        </div>
        <div className="card-footer">
            <Link to={`/przepis/${item.recipe_id}/${item.slug}`} className="btn btn-primary">Zobacz przepis</Link>
        </div>
    </div>
    )
}

function Masthead() {
    const [searchValue, setSearchValue] = useState("");
    const [recipes, setrecipes] = useState();
    const [recipesReady, setrecipesReady] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModal() {
        setModalIsOpen(false);
    }
 
    function formPost(e){
    e.preventDefault();
    fetch(API_DATA.RECIPES_SEARCH + searchValue)
        .then(res => res.json())
        .then(data => {
            if(data.count) {
                setrecipes(data.results);
            }else{
                setrecipes(false);
            }      
        setrecipesReady(true);
    })
    setModalIsOpen(true);
    }

    function searchTyping(e){
        setSearchValue(e.target.value);
    }

    return (
        <header className="masthead" id="Search">
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-10 align-self-end">
                    <h1 className="text-white font-weight-bold"><span className="icon-wolnowar"></span></h1>
                    <h1 className="text-uppercase text-white font-weight-bold">Potrawy z wolnowaru</h1>
                    <hr className="divider my-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                <form onSubmit={formPost}>
                    <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                        <input type="text" required minLength="3" onChange={searchTyping} value={searchValue} className="form-control form-control-lg" placeholder="wpisz nazwę dania..." />
                    </div>
                    <div className="col-12 col-md-3">
                        <button type="submit" className="btn btn-block btn-lg btn-primary">Szukaj!</button>
                    </div>
                    </div>
                </form>    
                <p class="text-white-75 font-weight-light mt-5">
                    Mamy <DataFetcher url={API_DATA.RECIPES_COUNTER}>{( data, ready ) => ready && data["count"]}</DataFetcher> przepisów na dania z wolnowaru
                </p>
                <a class="btn btn-primary btn-xl js-scroll-trigger" href="#NoIdearecipes">Nie masz pomysłu?</a>                
                <p className="text-white-75 font-weight-light mt-5">{searchValue.length < 3 & searchValue.length !== 0 ? "wpisz minimum 3 znaki :)" : ""}</p>
                </div>
            </div>
        </div>
        {recipesReady &&
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
        <button className="btn btn-secondary float-right btn-block mb-3" onClick={closeModal}>zamknij okno</button>
        {recipes?
            recipes.map((item, idx) => <SingleItem key={idx} item={item} />):
            <button className="btn btn-block">Brak przepisów</button>
        }
        </Modal>
    }
    </header>
    )
}
export default Masthead