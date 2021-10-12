import DataFetcher from "./DataFetcher";
import { Link } from "react-router-dom";


function NoIdeaReceipes(){
    return (
        <DataFetcher url='http://127.0.0.1:8000/v1/no_idea_receipes/'>
            {( data, ready ) => {
                return (
                    <section class="page-section bg-primary" id="about">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8 text-center">
                                    <h2 class="text-white mt-0">Nie masz pomysłu?</h2>
                                    <hr class="divider light my-4" />
                                    <p class="text-white-50 mb-4">Spóbuj poniższych przepisów!</p>
                                    { ready ?
                                        data.map(item => <Link className="btn btn-light btn-xl m-1" to={`/przepis/${item.receipe_id}`}>{item.name}</Link>):
                                        <h2>ładowanie danych...</h2>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }}
        </DataFetcher>
    )
}

export default NoIdeaReceipes