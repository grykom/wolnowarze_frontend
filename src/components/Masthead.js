import { useState } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";


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

function SingleItem(props) {
  return (
    <div class="card h-100 mb-4">
      <img className="img-fluid img-search" src={props.item.images[0]} alt="" />
        <div class="card-body">
          <h4 class="card-title"><Link to={`/przepis/${props.item.receipe_id}`}>{props.item.name}</Link></h4>
          <div class="flex-row justify-content-between d-flex">
            <p class="card-text">Liczba porcji: {props.item.serving_size}</p>
            <p class="card-text">Czas przygotowania: {props.item.preparing_time}</p>
          </div>
        </div>
      <div class="card-footer">
        <a href="#" class="btn btn-primary">Sprawdź przepis</a>
      </div>
    </div>
  )
}

function Masthead() {
  const [search, setSearch] = useState("")
  const [receipes, setReceipes] = useState()
  const [receipesReady, setReceipesReady] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);

 
  function closeModal() {
    setIsOpen(false);
  }
 
  function formPost(e){
    e.preventDefault();
    const url = `http://127.0.0.1:8000/v1/receipes/?search=${search}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.count){
        setReceipes(data.results);
      }else{
        setReceipes(false)
      }      
      setReceipesReady(true);
    })
    setIsOpen(true);
  }
  function Typing(e){
    setSearch(e.target.value)
  }
  return (
      <header className="masthead">
      <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
                  <h1 className="text-white font-weight-bold"><span className="icon-wolnowar"></span></h1>
                  <h1 className="text-uppercase text-white font-weight-bold">wolnowarze.pl</h1>
                  <hr className="divider my-4" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <form onSubmit={formPost}>
                  <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                      <input type="text" required minlength="3" onChange={Typing} value={search} className="form-control form-control-lg" placeholder="szukaj potrawę..." />
                    </div>
                    <div className="col-12 col-md-3">
                      <button type="submit" className="btn btn-block btn-lg btn-primary">Szukaj!</button>
                    </div>
                  </div>
                </form>    
                              
                <p className="text-white-75 font-weight-light mt-5">{search.length < 3 & search.length !== 0 ? "wpisz minimum 3 znaki :)" : ""}</p>
              </div>
          </div>
      </div>
      {receipesReady &&
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button class="btn btn-secondary float-right btn-block mb-3" onClick={closeModal}>zamknij okno</button>
        {receipes?
          receipes.map((item, idx) => <SingleItem key={idx} item={item} />):
          <button class="btn btn-default btn-block">Brak przepisów</button>
        }
      </Modal>
    }
  </header>
  )
}
export default Masthead