import { Link } from "react-router-dom";
import { useState } from "react";

import DataFetcher from "./DataFetcher";
import API_DATA from "./_ApiData";

function NoIdearecipes(){
    const [reload, setReload] = useState(false);

    return (
        <DataFetcher url={API_DATA.NO_IDEA_RECIPES} refresh={reload}>
            {( data, ready ) => {
                return (
                    <section className="page-section bg-primary" id="NoIdearecipes">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center">
                                    <h2 className="text-white mt-0">Nie masz pomysłu?</h2>
                                    <hr className="divider light my-4" />
                                    <p className="text-white-50 mb-4">Spóbuj poniższych przepisów na potrawy</p>
                                    { ready &&
                                        data.map((item, idx) => <Link key={idx} className="btn btn-light btn-xl m-1" to={`/przepis/${item.recipe_id}/${item.slug}`}>{item.name}</Link>)
                                    }   
                                    <p><button className="btn btn-sm btn-default text-white" onClick={() => setReload(!reload)}>
                                        losuj nowe pomysły <i className='fas text-white fa-sync ml-1'></i>
                                    </button></p>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }}
        </DataFetcher>
    )
}

export default NoIdearecipes