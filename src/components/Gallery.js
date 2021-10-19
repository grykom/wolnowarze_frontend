import { Link } from "react-router-dom";

import DataFetcher from "./DataFetcher";
import API_DATA from "./_ApiData";

function GalleryItem({ item }) {
    return (
        <div className="col-lg-4 col-sm-6">
            <Link className="portfolio-box" to={`/przepis/${item.receipe_id}/${item.slug}`}>
                <img className="img-fluid img-cover" src={item.images[0]} alt="" />
                <div className="portfolio-box-caption">
                    <div className="project-name">{item.name}</div>
                </div>
            </Link>
        </div>
    )
}

function Gallery(){  
    return (  
        <DataFetcher url={API_DATA.GALLERY}>      
            {( data, ready ) => {                
                return (
                    <section id="portfolio">
                        <div className="container-fluid p-0">
                            <div className="row no-gutters">
                                {ready ?
                                    data.filter(item => item.images[0]).map((item, idx) => <GalleryItem key={idx} item={item}/>)
                                    : 
                                    <h4 className="text-center">Ładowanie galerii...</h4>
                                }  
                            </div>
                        </div>
                    </section>                
                )
            }}
        </DataFetcher>              
    )
}
export default Gallery