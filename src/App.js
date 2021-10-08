import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import Footer from './components/Footer';
import ModalComponent from './components/ModalComponent';

function App() {
  return (
    <div>
      <Navbar />
      <Masthead />
      <WhySlowcooker />
      <NoIdeaReceipes />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
