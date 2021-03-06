import { Link } from "react-router-dom";

function Favs({ favs }){
    return (
        <>
            <section className="page-section" id="Favs">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Twoje ulubione przepisy</h2>
                            <hr className="divider my-4" />
                            <p className="text-muted mb-5">Poniżej znajdziesz listę potraw które zostały przez Ciebie dodane do ulubionych. Smacznego!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 ml-auto text-center mb-5 mb-lg-0">                            
                            <div>
                                {favs && favs.map((item, idx) => <Link key={idx} className="btn btn-light btn-xl m-1" to={`/${item.r_id}-${item.r_slug}`}>{item.r_name}</Link>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favs