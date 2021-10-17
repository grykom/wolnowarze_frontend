import { Link } from "react-router-dom";

function Footer(props){
    return (
        <>
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Twoja lista ulubionych</h2>
                            <hr className="divider my-4" />
                            <p className="text-muted mb-5">Ready to start your next project with us? Give us a call or send us an email and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 ml-auto text-center mb-5 mb-lg-0">
                            <i className="fas text-muted fa-list fa-3x mb-2"></i>
                            <div>
                                {props.liked && props.liked.map((item, idx) => <Link key={idx} className="btn btn-light btn-xl m-1" to={`/przepis/${item.r_id}/${item.r_slug}`}>{item.r_name}</Link>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-light py-5">
                <div className="container"><div className="small text-center text-muted">Copyright © 2020 - Start Bootstrap</div></div>
            </footer>
        </>
    )
}

export default Footer