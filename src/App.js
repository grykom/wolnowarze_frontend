import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Masthead from './components/Masthead';
import WhySlowcooker from './components/WhySlowcooker';
import Gallery from './components/Gallery';
import NoIdeaReceipes from './components/NoIdeaReceipes';
import { useState, useEffect } from "react";

function SingleApi(props) {
  return (
    <div>
      {props.name}
    </div>
  )
}

function App() {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/v1/receipes/")
    .then(res => res.json())
    .then(data => {
      setApiData(data.results) 
      setLoading(false)
    })
  }, [])

  const services = apiData.map(item => <SingleApi name={item.name} />)

  return (
    <div>
      <Navbar />
      <Masthead />
      <WhySlowcooker />
      <NoIdeaReceipes />
      <Gallery />
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit elo and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {loading?"loading...":services}
        </header>
      </div>
    </div>
  );
}

export default App;
