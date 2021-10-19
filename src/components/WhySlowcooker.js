import DataFetcher from "./DataFetcher";
import API_DATA from "./_ApiData";

function WhySlowcooker(){  
    return (
        <DataFetcher url={API_DATA.WHY_SLOWCOOKER}>
            {( data, ready ) => {
                return (
                    <section className="page-section" id="WhySlowcooker">
                        <div className="container">
                            <h2 className="text-center mt-0">Dlaczego wolnowar?</h2>
                            <hr className="divider my-4" />
                            <div className="row">
                                {ready ?
                                    data.map((item, idx) => <ConsItem key={idx} item={item} />) :
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

function ConsItem({ item }){
    return (
        <div className="col-lg col-md-6 text-center">
            <div className="mt-5">
                <i className={`fas fa-4x text-primary mb-4 ${item.icon}`}></i>
                <h3 className="h4 mb-2">{item.heading}</h3>
                <p className="text-muted mb-0">{item.paragraph}</p>
            </div>
        </div>
    )
}

export default WhySlowcooker