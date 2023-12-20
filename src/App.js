import logo from './logo.svg';
import './App.css';
import Landing from './component/Landing';
import { BrowserRouter as BrowserRouter,Routes, Route } from 'react-router-dom';
import Error from './component/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' index Component={Landing}/>
      <Route path='*' Component={Error}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
