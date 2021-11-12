import { Link } from "react-router-dom";
import { useState } from "react";

import DataFetcher from "./DataFetcher";
import API_DATA from "./_ApiData";

function GalleryItem({ item }) {
    return (
        <div className="col-lg-4 col-sm-6">
            <Link className="portfolio-box" to={`/${item.recipe_id}-${item.slug}`}>
                <img className="img-fluid img-cover" src={item.images[0]} alt="" />
                <div className="portfolio-box-caption">
                    <div className="project-name">{item.name}</div>
                </div>
            </Link>
        </div>
    )
}

function Gallery(){  
    const [reload, setReload] = useState(false);

    return (  
        <DataFetcher url={API_DATA.GALLERY} refresh={reload}>      
            {( data, ready ) => {                
                return (
                    <section id="Gallery">
                        <div className="container-fluid p-0">
                            <div className="row no-gutters">
                                {ready &&
                                    data.filter(item => item.images[0]).map((item, idx) => <GalleryItem key={idx} item={item}/>)
                                }  
                            </div>
                            <p className="text-center">
                                <button className="btn btn-sm btn-default" onClick={() => setReload(!reload)}>
                                        losuj nowe zdjęcia <i className='fas fa-sync ml-1'></i>
                                </button>
                            </p>
                        </div>
                    </section>                
                )
            }}
        </DataFetcher>              
    )
}
export default Gallery