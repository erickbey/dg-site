import './App.css';
import Footer from './components/Footer/Footer';
import Navigationbar from './components/NavigationBar/Navigationbar';
import Newsletter from './components/Newsletter/Newsletter';
import bgpic from './images/ricky-wysocki.jpg';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navigationbar/>

      <div className='background-image-container'>
        <img className='bg-pic' src={bgpic} alt='background Ricky Wysocki' />
        <Nav.Link className='shop-button-container' href="/products">
          <button className='shop-button' variant="secondary">Shop Now</button>
        </Nav.Link>
      </div>
      
      <div className='footer-placement'>
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

export default App;
