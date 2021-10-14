import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import Footer from './components/Footer';
import ReceipeModal from './components/ReceipeModal';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Masthead />
        <WhySlowcooker />
        <NoIdeaReceipes />
        <Gallery />
        <Footer />
        <Route path="/przepis/:receipe_id">
          <ReceipeModal />
        </Route>
      </Router>
    </div>
  );
}
export default App;
