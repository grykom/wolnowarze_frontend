import DataFetcher from "./DataFetcher"

function GalleryItem(props) {
    return (
        <div className="col-lg-4 col-sm-6">
            <a className="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg"
                ><img className="img-fluid img-cover" src={props.data.images[0]} alt="" />
                <div className="portfolio-box-caption">
                    <div className="project-name">{props.data.name}</div>
                </div>
            </a>
        </div>
    )
}

function Gallery(){  
    return (  
        <DataFetcher url='http://127.0.0.1:8000/v1/gallery/'>      
            {( data, ready ) => {                
                return (
                    <section id="portfolio">
                        <div className="container-fluid p-0">
                            <div className="row no-gutters">
                                {ready ?
                                    data.filter(item => item.images[0]).map(item => <GalleryItem key={item.id} data={item}/>)
                                    : 
                                    <h2>ładowanie danych...</h2>
                                }  
                            </div>
                        </div>
                    </section>                
                )
            }}
        </DataFetcher>              
    )
}
export default Gallery;