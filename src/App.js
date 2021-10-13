import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import Footer from './components/Footer';
import ModalComponent from './components/ModalComponent';
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
              <ModalComponent />
            </Route>
      </Router>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
export default App;
