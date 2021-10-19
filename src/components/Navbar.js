function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-scrolled fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top"><span className="icon-wolnowar"></span> wolnowarze.pl</a><button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
						<li className="nav-item"><a className="nav-link js-scroll-trigger" href="#page-top">Szukaj przepisu</a></li>
						<li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Dlaczego wolnowar?</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Losowe przepisy</a></li>                        
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#portfolio">Galeria</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Twoje ulubione</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar