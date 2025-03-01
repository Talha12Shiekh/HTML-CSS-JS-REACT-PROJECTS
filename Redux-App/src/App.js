import Navabar from './components/Navabar'
import './App.css';
import Shop from './Shop';

function App() {
  return (
    <div>
     <Navabar heading="State bank of shiekhs"/>
     <div className="container">
     <Shop/>
     </div>
    </div>
  );
}

export default App;
