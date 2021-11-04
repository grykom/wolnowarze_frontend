import React from 'react'
import crockpot_logo from './images/crockpot_logo.jpg'

function Footer() {
    return (
        <footer className="bg-light py-5">
            <div className="container small text-center text-muted">
                    Copyright © 2022 - <a href="https://github.com/grykom">grykom</a>, Start Bootstrap
                    
                    <a href="https://www.crockpot.pl">
                        <img className="crockpot_logo" src={crockpot_logo} alt="crock pot logo" />
                    </a>
                    <p>Recipies by <a href="https://www.crockpot.pl">https://www.crockpot.pl</a></p>
            </div>            
        </footer>
    )
}

export default Footer
