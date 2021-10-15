import { Link } from "react-router-dom";

import DataFetcher from "./DataFetcher";
import API_DATA from "./_ApiData";

function GalleryItem(props) {
    return (
        <div className="col-lg-4 col-sm-6">
            <Link className="portfolio-box" to={`/przepis/${props.data.receipe_id}/${props.data.slug}`}>
                <img className="img-fluid img-cover" src={props.data.images[0]} alt="" />
                <div className="portfolio-box-caption">
                    <div className="project-name">{props.data.name}</div>
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
                                    data.filter(item => item.images[0]).map((item, idx) => <GalleryItem key={idx} data={item}/>)
                                    : 
                                    <h2>Ładowanie danych...</h2>
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