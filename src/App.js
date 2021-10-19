import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import Favs from './components/Favs';
import ReceipeModal from './components/ReceipeModal';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem(`favs`)))

  return (
    <div>
      <Router>
        <Navbar />
        <Masthead />
        <WhySlowcooker />
        <NoIdeaReceipes />
        <Gallery />
        <Favs favs={favs} />
        <Route path="/przepis/:receipe_id/:receipe_slug">
          <ReceipeModal setFavs={setFavs} />
        </Route>
      </Router>
    </div>
  );
}
export default App