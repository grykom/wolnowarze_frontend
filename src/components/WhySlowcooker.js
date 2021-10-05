import DataFetcher from "./DataFetcher";

function WhySlowcooker(){  
    return (
        <DataFetcher url='http://127.0.0.1:8000/v1/why_slowcooker/'>
            {( data, ready ) => {
                return (
                    <section className="page-section" id="services">
                        <div className="container">
                            <h2 className="text-center mt-0">Dlaczego wolnowar?</h2>
                            <hr className="divider my-4" />
                            <div className="row">
                                {ready ?
                                    data.map((item, idx) => <ConsItem key={idx} item={item} />) :
                                    <h2>Loading...</h2> 
                                }
                            </div>
                        </div>
                    </section>
                )
            }}            
        </DataFetcher>
    )
}

function ConsItem(props){
    return (
        <div className="col-lg col-md-6 text-center">
            <div className="mt-5">
                <i className={`fas fa-4x text-primary mb-4 ${props.item.icon}`}></i>
                <h3 className="h4 mb-2">{props.item.heading}</h3>
                <p className="text-muted mb-0">{props.item.paragraph}</p>
            </div>
        </div>
    )
}

export default WhySlowcooker