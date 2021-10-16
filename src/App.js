import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import Footer from './components/Footer';
import ReceipeModal from './components/ReceipeModal';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [liked, setLiked] = useState(JSON.parse(localStorage.getItem(`likes`)))

  return (
    <div>
      <Router>
        <Navbar />
        <Masthead />
        <WhySlowcooker />
        <NoIdeaReceipes />
        <Gallery />
        <Footer liked={liked} />
        <Route path="/przepis/:receipe_id/:receipe_slug">
          <ReceipeModal liked={liked} setLiked={setLiked} />
        </Route>
      </Router>
    </div>
  );
}
export default App