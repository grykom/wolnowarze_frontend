import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaRecipes from './components/NoIdeaRecipes';
import Favs from './components/Favs';
import RecipeModal from './components/RecipeModal';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem(`favs`)))

  return (
    <div>
      <Router>
        <Navbar />
        <Masthead />
        <WhySlowcooker />
        <NoIdeaRecipes />
        <Gallery />
        <Favs favs={favs} />
        <Route path="/przepis/:recipe_id/:recipe_slug">
          <RecipeModal setFavs={setFavs} />
        </Route>
      </Router>
    </div>
  );
}
export default App