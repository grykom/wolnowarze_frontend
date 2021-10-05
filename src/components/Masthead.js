import { useState } from "react";

function Masthead() {
  const [search, setSearch] = useState("")
  const [receipes, setReceipes] = useState([])
 
  function FormPost(e){
    e.preventDefault();
    const url = `http://127.0.0.1:8000/v1/receipes/?search=${search}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results)
      setReceipes(data.results);
    })
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
                        <form onSubmit={FormPost}>
                          <div className="form-row">
                            <div className="col-12 col-md-9 mb-2 mb-md-0">
                              <input type="text" onChange={Typing} value={search} className="form-control form-control-lg" placeholder="szukaj potrawę..." />
                            </div>
                            <div className="col-12 col-md-3">
                              <button type="submit" className="btn btn-block btn-lg btn-primary">Szukaj!</button>
                            </div>
                          </div>
                        </form>
                  
                  <p className="text-white-75 font-weight-light mt-5">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</p>
                  <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
              </div>
          </div>
      </div>
  </header>
  )
}
export default Masthead