import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/chat/Chat';

const App = () => {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Join />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
