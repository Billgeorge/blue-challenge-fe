import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<Home/>} />
       </Routes>    
    </div>
  );
}

export default App;
